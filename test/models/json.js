'use strict'; // jshint ignore:line

module.exports = (sequelize, DataTypes) => {
  var Json = sequelize.define('Json', {
    simple: {
      type: DataTypes.JSON,
      allowNull: true,
      description: 'JSON'
    }
  });
  return Json;
};
