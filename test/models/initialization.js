'use strict'; // jshint ignore:line
module.exports = (sequelize, DataTypes) => {
  var Test = sequelize.define('Test', {
    string_tst: {
      type: DataTypes.STRING,
      allowNull: false
    },
    integer_tst: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Test;
};
