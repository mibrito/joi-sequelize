'use strict'; // jshint ignore:line
var _ = require('lodash');
var joi = require('joi');

function getJoi(schema, attr) {
  var returnJoi;
  
  switch (schema.type){
    case 'array':
      returnJoi = joi.array();
      if(schema.items) {
        returnJoi = returnJoi.items(getJoi({type: schema.items.type}));
      }
      break;
    case 'biginteger':
      returnJoi = joi.number().integer();
      break;
    case 'boolean':
      returnJoi = joi.boolean();
      break;
    case 'date':
      returnJoi = joi.date();
      if (attr.iso) returnJoi = returnJoi.iso();
      if (attr.format) returnJoi = returnJoi.format(attr.format);
      break;
    case 'dateonly':
      returnJoi = joi.date();
      if (attr.format) returnJoi = returnJoi.format(attr.format);
      break;
    case 'decimal':
      returnJoi = joi.number();
      if (schema.precision) returnJoi = returnJoi.precision(schema.precision);
      break;
    case 'double':
      returnJoi = joi.number();
      if (schema.precision) returnJoi = returnJoi.precision(schema.precision);
      break;
    case 'string':
      returnJoi = joi.string();
      if (schema.max) returnJoi = returnJoi.max(schema.max);
      break;
    case 'enum':
      if (!schema.values) throw new Error('Enum must define it types');
      returnJoi = joi.string();
      if (attr.allowNull || !attr.hasOwnProperty('allowNull')) {
        returnJoi = returnJoi.valid(_.concat(null, schema.values));
      } else {
        returnJoi = returnJoi.valid(schema.values);
      }

      break;
    case 'float':
      returnJoi = joi.number();
      if (schema.precision) returnJoi = returnJoi.precision(schema.precision);
      break;
    case 'real':
      returnJoi = joi.number();
      if (schema.precision) returnJoi = returnJoi.precision(schema.precision);
      break;
      // case 'range': // needs to be thinked
      //   returnJoi = joi.string().integer();
      //   break;
    case 'geometry':
      returnJoi = joi.object({
        type: joi.string().valid(['POINT', 'LINESTRING', 'POLYGON']),
        coordinates: joi.array(),
        crs: joi.object(),
      });
      break;
    case 'integer':
      returnJoi = joi.number().integer();
      break;
    case 'text':
      returnJoi = joi.string();
      break;
    case 'uuid':
      returnJoi = joi.string().length(36);
      break;
    case 'json':
    case 'jsonb':
    default:
      returnJoi = joi.any();
  }

  return returnJoi;
}

module.exports = function (modelName, schema) {
  this._schema = schema;
  this._modelName = modelName;
  this.isString = [];

  _.map(schema, (attr, key) => {
    let schema = attr.isJS ? attr : attr.type;

    if (attr instanceof Function) schema = attr();
    if (schema instanceof Function) schema = schema();

    if (!schema.type) throw new Error('Schema must have a type');

    if(attr.allowNull === false){
      this._allowNull.push(key);
    }

    this._types[key] = {
      original: schema.type,
      query: schema.type,
    };

    this._joi[key] = getJoi(schema, attr);

    if ((attr.allowNull || !attr.hasOwnProperty('allowNull')) && schema.type !== 'enum') {
      if(schema.type==='string'){
        this._joi[key] = this._joi[key].allow([null, '']);
      }else{
        this._joi[key] = this._joi[key].allow(null);
      }
    }

    if (attr.description) {
      this._joi[key] = this._joi[key].description(attr.description);
    }

    this._joi[key] = this._joi[key].label(attr.label ? attr.label : key);
  });
};
