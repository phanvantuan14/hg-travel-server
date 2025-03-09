'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Lienhekhachsan extends Model {
    static associate(models) {
      Lienhekhachsan.belongsTo(models.Hotel, {
        foreignKey: "hotelId"
      });
    }
  }
  Lienhekhachsan.init({
    hotelId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Hotels",
        key: "id"
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 0 // 0: Chưa xử lý, 1: Đã xử lý
    }
  }, {
    sequelize,
    modelName: 'Lienhekhachsan',
  });
  return Lienhekhachsan;
};