'use strict'; // jshint ignore:line
var _ = require('lodash');
module.exports = {
  ARRAY: function() {
    return {type: 'array'};
  },
  BIGINT: function() {
    return {type: 'biginteger'};
  },
  BOOLEAN: function() {
    return {type: 'boolean'};
  },
  BLOB: function (tiny) {
    return {type: 'blob', tiny: tiny ? true : false};
  },
  DATE: function (fraction) {
    return {type: 'date', fraction: fraction};
  },
  DATEONLY: function () {
    return {type: 'dateonly'};
  },
  DOUBLE: function(precision, scale) {
    return {type: 'double', precision: precision, scale: scale};
  },
  DECIMAL: function(precision, scale) {
    return {type: 'decimal', precision: precision, scale: scale};
  },
  GEOMETRY: function(feature, srid) {
    return {type: 'geometry', feature: feature, srid: srid};
  },
  INTEGER: function () {
    return {type: 'integer'};
  },
  JSON: function () {
    return {type: 'json'};
  },
  ENUM: function () {
    return {type: 'enum', values: _.map(arguments, e => e)};
  },
  FLOAT: function(precision, scale) {
    return {type: 'float', precision: precision, scale: scale};
  },
  REAL: function(precision, scale) {
    return {type: 'real', precision: precision, scale: scale};
  },
  RANGE: function() {
    return {type: 'range'};
  },
  STRING: function (max) {
    return {type: 'string', max: max};
  },
  TEXT: function (tiny) {
    return {type: 'text', tiny: tiny ? true : false};
  },
  UUID: function () {
    return {type: 'uuid'};
  }
};
