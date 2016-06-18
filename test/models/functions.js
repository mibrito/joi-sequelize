'use strict'; // jshint ignore:line
module.exports = (sequelize, DataTypes) => {
  var Initializing = sequelize.define('Initializing', {
    required_field: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    not_required_field: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });

  return Initializing;
};
