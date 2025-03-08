'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DichvuTour extends Model {
  
    static associate(models) {
      DichvuTour.belongsTo(models.Tour, {
        foreignKey: "tourId"
      })
    }
  };
  DichvuTour.init({
    tourId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Tour",
        key: "id"
      }
    },
    dichvuId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Dichvu",
        key: "id"
      }
    }
  }, {
    sequelize,
    modelName: 'DichvuTour',
  });
  return DichvuTour;
};