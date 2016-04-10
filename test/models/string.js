'use strict'; // jshint ignore:line

module.exports = (sequelize, DataTypes) => {
  var Test = sequelize.define('Test', {
    simple: {
      type: DataTypes.STRING,
      allowNull: true,
      description: 'Simple string'
    },
    with_length: {
      type: DataTypes.STRING(2),
      allowNull: true,
      description: 'String with max length'
    }
  });
  return Test;
};
