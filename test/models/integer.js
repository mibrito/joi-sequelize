'use strict'; // jshint ignore:line

module.exports = (sequelize, DataTypes) => {
  var Test = sequelize.define('Test', {
    simple: {
      type: DataTypes.INTEGER,
      allowNull: true,
      description: 'Simple integer'
    }
  });
  return Test;
};
