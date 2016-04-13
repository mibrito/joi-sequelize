'use strict'; // jshint ignore:line

module.exports = (sequelize, DataTypes) => {
  var Integer = sequelize.define('Integer', {
    simple: {
      type: DataTypes.INTEGER,
      allowNull: true,
      description: 'Simple integer'
    }
  });
  return Integer;
};
