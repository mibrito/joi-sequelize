'use strict'; // jshint ignore:line
var _ = require('lodash');
var joi = require('joi');

module.exports = function (modelName, schema) {
  this.schema = schema;
  this.modelName = modelName;
  this.isString = [];

  _.map(schema, (attr, key) => {
    let schema = attr.isJS ? attr : attr.type;

    if( attr instanceof Function ) schema = attr();
    if( schema instanceof Function ) schema = schema();

    if(!schema.type) throw new Error('Schema must have a type');

    switch(schema.type){
      case 'array':
        this.joi[key] = joi.array();
        break;
      case 'biginteger':
        this.joi[key] = joi.number().integer();
        break;
      case 'boolean':
        this.joi[key] = joi.boolean();
        break;
      case 'date':
        this.joi[key] = joi.date();
        if(attr.iso) this.joi[key] = this.joi[key].iso();
        if(attr.format) this.joi[key] = this.joi[key].format(attr.format);
        break;
      case 'dateonly':
        this.joi[key] = joi.date();
        if(attr.format) this.joi[key] = this.joi[key].format(attr.format);
        break;
      case 'decimal':
        this.joi[key] = joi.number();
        if(schema.precision) this.joi[key] = this.joi[key].precision(schema.precision);
        break;
      case 'double':
        this.joi[key] = joi.number();
        if(schema.precision) this.joi[key] = this.joi[key].precision(schema.precision);
        break;
      case 'string':
        this.joi[key] = joi.string();
        if(schema.max) this.joi[key] = this.joi[key].max(schema.max);
        break;
      case 'enum':
        if(!schema.values) throw new Error('Enum must define it types');
        this.joi[key] = joi.string().valid(schema.values);
        break;
      case 'float':
        this.joi[key] = joi.number();
        if(schema.precision) this.joi[key] = this.joi[key].precision(schema.precision);
        break;
      case 'real':
        this.joi[key] = joi.number();
        if(schema.precision) this.joi[key] = this.joi[key].precision(schema.precision);
        break;
      // case 'range': // needs to be thinked
      //   this.joi[key] = joi.string().integer();
      //   break;
      case 'geometry':
        this.joi[key] = joi.object({
          type: joi.string().valid(['POINT', 'LINESTRING', 'POLYGON']),
          coordinates: joi.array(),
          crs: joi.object()
        });
        break;
      case 'json':
        this.joi[key] = joi.object();
        break;
      case 'jsonb':
        this.joi[key] = joi.object();
        break;
      case 'integer':
        this.joi[key] = joi.number().integer();
        break;
      case 'text':
        this.joi[key] = joi.string();
        break;
      case 'uuid':
        this.joi[key] = joi.string().length(36);
        break;
      default:
        this.joi[key] = joi.any();
    }


    if(attr.allowNull || !attr.hasOwnProperty('allowNull')){
      this.joi[key] = this.joi[key].allow(null);
    }
    if(attr.description) {
      this.joi[key] =this.joi[key].description(attr.description);
    }
  });
};
