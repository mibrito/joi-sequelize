'use strict'; // jshint ignore:line

module.exports = {
  STRING: (max) => {
    return {type: 'string', max: max};
  },
  INTEGER: () => {
    return {type: 'integer'};
  },
};
