'use strict'; // jshint ignore:line
module.exports = (sequelize, DataTypes) => {
  var Initializing = sequelize.define('Initializing', {
    string_tst: {
      type: DataTypes.STRING,
      allowNull: false
    },
    integer_tst: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  return Initializing;
};
