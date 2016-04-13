'use strict'; // jshint ignore:line

module.exports = function(model) {
  this.joi = {};
  this.model = model;
  this.sequelize = {
    define: require('./lib/define').bind(this)
  };
  this.datatypes = require('./lib/datatypes');
  model(this.sequelize, this.datatypes);
};
