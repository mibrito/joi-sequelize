'use strict'; // jshint ignore:line
var _ = require('lodash');

var JSType = function(o){
  _.forEach(o, (v, k) => this[k] = v);
  this.isJS = true;
};

module.exports = {
  ARRAY: (items) => new JSType({type: 'array', items: items()}),
  BIGINT: () => new JSType({ type: 'biginteger' }),
  BOOLEAN: () => new JSType({ type: 'boolean' }),
  BLOB: (tiny) => new JSType({type: 'blob', tiny: tiny ? true : false}),
  DATE: (fraction) => new JSType({ type: 'date', fraction: fraction }),
  DATEONLY: () => new JSType({ type: 'dateonly' }),
  DOUBLE: (precision, scale) => new JSType({ type: 'double', precision: precision, scale: scale }),
  DECIMAL: (precision, scale) => new JSType({ type: 'decimal', precision: precision, scale: scale }),
  GEOMETRY: (feature, srid) => new JSType({ type: 'geometry', feature: feature, srid: srid }),
  INTEGER: () => new JSType({ type: 'integer' }),
  JSON: () => new JSType({ type: 'json' }),
  JSONB: () => new JSType({ type: 'jsonb' }),
  ENUM: function() { return new JSType({ type: 'enum', values: _.map(arguments, e => e) }); },
  FLOAT: (precision, scale) => new JSType({ type: 'float', precision: precision, scale: scale }),
  REAL: (precision, scale) => new JSType({ type: 'real', precision: precision, scale: scale }),
  RANGE: () => new JSType({ type: 'range' }),
  STRING: (max) => new JSType({ type: 'string', max: max }),
  TEXT: (tiny) => new JSType({type: 'text', tiny: tiny ? true : false}),
  UUID: () => new JSType({ type: 'uuid' }),
  VIRTUAL: (type) => type()
};
