'use strict'; // jshint ignore:line

var joi = require('joi');
let internals = {};

module.exports = internals;

internals.joi = function () {
  return this._joi;
};

internals.omit = function () {
  if(!arguments.length) throw new Error('Omit must have params (arguments)');
  if(arguments[0] instanceof Array) return _.omit(this._joi, arguments[0]);
  else return _.omit(this._joi, arguments);
};

internals.pick = function () {
  if(!arguments.length) throw new Error('Pick must have params (arguments)');
  if(arguments[0] instanceof Array) return _.pick(this._joi, arguments[0]);
  else return _.pick(this._joi, arguments);
};
internals.include = function (o) {
  if(!o || !(o instanceof Object) )
    throw new Error('Pick must have params (arguments)');
  return _.merge(this._joi, o);
};

internals.withRequired = function () {
  if(this._allowNull.length){
    return joi.object().keys(this._joi).requiredKeys(this._allowNull);
  }
  return this._joi;
};

internals.types = function() {
  return this._types;
};

internals.setQueryType = function (key, type) {
  this._types[key].query = type;
  return this;
};
