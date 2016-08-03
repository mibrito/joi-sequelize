'use strict'; // jshint ignore:line

module.exports = (sequelize, DataTypes) => {
  var String = sequelize.define('Virtual', {
    base: {
      type: DataTypes.STRING,
      allowNull: true,
      description: 'Simple string'
    },
    virtual: {
      type: DataTypes.VIRTUAL(DataTypes.STRING, ['base']),
      get: () => this.base,
      description: 'I echo base'
    }
  });
  return String;
};
