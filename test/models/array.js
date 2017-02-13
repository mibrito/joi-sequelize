'use strict'; // jshint ignore:line

module.exports = (sequelize, DataTypes) => {
  var Array = sequelize.define('Array', {
    text: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
      description: 'Text array'
    },
    boolean: {
      type: DataTypes.ARRAY(DataTypes.BOOLEAN),
      allowNull: true,
      description: 'Boolean array'
    },
    integer: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
      description: 'Int array'
    }
  });
  return Array;
};
