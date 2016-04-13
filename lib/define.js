'use strict'; // jshint ignore:line
var _ = require('lodash');
var joi = require('joi');

module.exports = function (modelName, schema) {
  this.schema = schema;
  this.modelName = modelName;
  this.isString = [];

  _.map(schema, (attr, key) => {
    let schema;

    if(!attr.type) throw new Error('Attribute must have a type');
    if( attr.type instanceof Function ) schema = attr.type();
    else schema = attr.type;

    if(!schema.type) throw new Error('Schema must have a type');

    switch(schema.type){
      case 'boolean':
        this.joi[key] = joi.boolean();
        break;
      case 'string':
        this.joi[key] = joi.string();
        if(schema.max) this.joi[key] = this.joi[key].max(schema.max);
        break;
      case 'enum':
        if(!schema.values) throw new Error('Enum must define it types');
        this.joi[key] = joi.string().valid(schema.values);
        break;
      case 'integer':
        this.joi[key] = joi.number().integer();
        break;
      case 'date':
        this.joi[key] = joi.date();
        if(attr.iso) this.joi[key] = this.joi[key].iso();
        if(attr.format) this.joi[key] = this.joi[key].format(attr.format);
    }


    if(attr.allowNull){
      this.joi[key] = this.joi[key].allow(null);
    }
    if(attr.description) {
      this.joi[key] =this.joi[key].description(attr.description);
    }
  });
};
