'use strict'; // jshint ignore:line
let _ = require('lodash');

let JoiSequelize = function(model) {
  this._joi = {};
  this._model = model;
  this._types = {};
  this.sequelize = {
    define: require('./lib/define').bind(this)
  };
  this.datatypes = require('./lib/datatypes');
  model(this.sequelize, this.datatypes);
};

JoiSequelize.prototype.joi = function () {
  return this._joi;
};
JoiSequelize.prototype.omit = function () {
  if(!arguments.length) throw new Error('Omit must have params (arguments)');
  if(arguments[0] instanceof Array) return _.omit(this._joi, arguments[0]);
  else return _.omit(this._joi, arguments);
};
JoiSequelize.prototype.pick = function () {
  if(!arguments.length) throw new Error('Pick must have params (arguments)');
  if(arguments[0] instanceof Array) return _.pick(this._joi, arguments[0]);
  else return _.pick(this._joi, arguments);
};
JoiSequelize.prototype.include = function (o) {
  if(!o || !(o instanceof Object) )
    throw new Error('Pick must have params (arguments)');
  return _.merge(this._joi, o);
};
JoiSequelize.prototype.types = function() {
  return this._types;
};
JoiSequelize.prototype.setQueryType = function (key, type) {
  this._types[key].query = type;
  return this;
}


module.exports = JoiSequelize;
