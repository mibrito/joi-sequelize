'use strict'; // jshint ignore:line
let _ = require('lodash');

let JoiSequelize = function(model) {
  this._joi = {};
  this._model = model;
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
  return _.omit(this._joi, arguments);
};
JoiSequelize.prototype.pick = function () {
  if(!arguments.length) throw new Error('Pick must have params (arguments)');
  return _.pick(this._joi, arguments);
};

module.exports = JoiSequelize;
