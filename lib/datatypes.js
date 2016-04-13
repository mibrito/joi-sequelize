'use strict'; // jshint ignore:line
var _ = require('lodash');
module.exports = {
  BOOLEAN: function() {
    return {type: 'boolean'};
  },
  STRING: function (max) {
    return {type: 'string', max: max};
  },
  INTEGER: function () {
    return {type: 'integer'};
  },
  ENUM: function () {
    return {type: 'enum', values: _.map(arguments, e => e)};
  },
  DATE: function (fraction) {
    return {type: 'date', fraction: fraction};
  }
};
