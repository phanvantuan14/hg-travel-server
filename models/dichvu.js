'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dichvu extends Model {

    static associate(models) {
      Dichvu.belongsToMany(models.Tour, {
        through: "DichvuTours"
      })
    }
  };
  Dichvu.init({
    name: DataTypes.STRING,
    mota: DataTypes.STRING,
    icon: DataTypes.STRING,
    loadhome: DataTypes.INTEGER,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Dichvu',
  });
  return Dichvu;
};