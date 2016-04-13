'use strict'; // jshint ignore:line

module.exports = (sequelize, DataTypes) => {
  var Boolean = sequelize.define('Boolean', {
    simple: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      description: 'Simple integer'
    }
  });
  return Boolean;
};
