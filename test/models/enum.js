'use strict'; // jshint ignore:line

module.exports = (sequelize, DataTypes) => {
  var Test = sequelize.define('Test', {
    simple: {
      type: DataTypes.ENUM('type1', 'type2'),
      allowNull: true,
      description: 'Simple enum'
    },
    simple_not_null: {
      type: DataTypes.ENUM('type1', 'type2'),
      allowNull: false,
      description: 'Simple enum not null'
    }
  });
  return Test;
};
