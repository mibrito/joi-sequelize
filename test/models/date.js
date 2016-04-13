'use strict'; // jshint ignore:line

module.exports = (sequelize, DataTypes) => {
  var Test = sequelize.define('Test', {
    simple: {
      type: DataTypes.DATE,
      allowNull: true,
      description: 'Simple date'
    },
    with_fraction: {
      type: DataTypes.DATE(2),
      allowNull: true,
      description: 'Date with fractional seconds'
    },
    with_format: {
      type: DataTypes.DATE,
      allowNull: true,
      description: 'Date with format',
      format: 'YYYY/MM/DD'
    },
    with_iso: {
      type: DataTypes.DATE,
      allowNull: true,
      description: 'Date with iso format',
      iso: true
    }
  });
  return Test;
};
