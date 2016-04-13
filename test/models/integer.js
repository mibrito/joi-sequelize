'use strict'; // jshint ignore:line

module.exports = (sequelize, DataTypes) => {
  var Integer = sequelize.define('Integer', {
    very_simple: DataTypes.INTEGER,
    simple: {
      type: DataTypes.INTEGER,
      allowNull: true,
      description: 'Simple integer'
    }
  });
  return Integer;
};
