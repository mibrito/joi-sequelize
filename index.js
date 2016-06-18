'use strict'; // jshint ignore:line
let _ = require('lodash');
let fn = require('./lib/functions');

let JoiSequelize = function(model) {
  this._joi = {};
  this._model = model;
  this._types = {};
  this._allowNull = [];
  this.sequelize = {
    define: require('./lib/define').bind(this)
  };
  this.datatypes = require('./lib/datatypes');
  model(this.sequelize, this.datatypes);
};

_.merge(JoiSequelize.prototype, fn);


module.exports = JoiSequelize;
