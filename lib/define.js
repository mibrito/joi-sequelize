'use strict'; // jshint ignore:line
var _ = require('lodash');
var joi = require('joi');

module.exports = function (modelName, schema) {
  this._schema = schema;
  this._modelName = modelName;
  this.isString = [];

  _.map(schema, (attr, key) => {
    let schema = attr.isJS ? attr : attr.type;

    if( attr instanceof Function ) schema = attr();
    if( schema instanceof Function ) schema = schema();

    if(!schema.type) throw new Error('Schema must have a type');

    switch(schema.type){
      case 'array':
        this._joi[key] = joi.array();
        break;
      case 'biginteger':
        this._joi[key] = joi.number().integer();
        break;
      case 'boolean':
        this._joi[key] = joi.boolean();
        break;
      case 'date':
        this._joi[key] = joi.date();
        if(attr.iso) this._joi[key] = this._joi[key].iso();
        if(attr.format) this._joi[key] = this._joi[key].format(attr.format);
        break;
      case 'dateonly':
        this._joi[key] = joi.date();
        if(attr.format) this._joi[key] = this._joi[key].format(attr.format);
        break;
      case 'decimal':
        this._joi[key] = joi.number();
        if(schema.precision) this._joi[key] = this._joi[key].precision(schema.precision);
        break;
      case 'double':
        this._joi[key] = joi.number();
        if(schema.precision) this._joi[key] = this._joi[key].precision(schema.precision);
        break;
      case 'string':
        this._joi[key] = joi.string();
        if(schema.max) this._joi[key] = this._joi[key].max(schema.max);
        break;
      case 'enum':
        if(!schema.values) throw new Error('Enum must define it types');
        this._joi[key] = joi.string().valid(schema.values);
        break;
      case 'float':
        this._joi[key] = joi.number();
        if(schema.precision) this._joi[key] = this._joi[key].precision(schema.precision);
        break;
      case 'real':
        this._joi[key] = joi.number();
        if(schema.precision) this._joi[key] = this._joi[key].precision(schema.precision);
        break;
      // case 'range': // needs to be thinked
      //   this._joi[key] = joi.string().integer();
      //   break;
      case 'geometry':
        this._joi[key] = joi.object({
          type: joi.string().valid(['POINT', 'LINESTRING', 'POLYGON']),
          coordinates: joi.array(),
          crs: joi.object()
        });
        break;
      case 'json':
        this._joi[key] = joi.object();
        break;
      case 'jsonb':
        this._joi[key] = joi.object();
        break;
      case 'integer':
        this._joi[key] = joi.number().integer();
        break;
      case 'text':
        this._joi[key] = joi.string();
        break;
      case 'uuid':
        this._joi[key] = joi.string().length(36);
        break;
      default:
        this._joi[key] = joi.any();
    }


    if(attr.allowNull || !attr.hasOwnProperty('allowNull')){
      this._joi[key] = this._joi[key].allow(null);
    }
    if(attr.description) {
      this._joi[key] =this._joi[key].description(attr.description);
    }
  });
};
