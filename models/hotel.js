'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Hotel.hasMany(models.Anh)
    }
  };
  Hotel.init({
    name: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    diachi: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    sdt: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    giaphong: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    avatar: {
      type: DataTypes.STRING(5000),
      allowNull: false
    },
    tenanh: {
      type: DataTypes.STRING(1000)
    },
    chitiethotel: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    luuy: {
      type: DataTypes.TEXT
    },
    vitri: {
      type: DataTypes.INTEGER,
      defaultValue: 1  // 1: Trong nước, 2: Nước ngoài
    },
    bando: {
      type: DataTypes.STRING(5000)
    },
    thoigian: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValue: 1  // 1: Hoạt động, 0: Không hoạt động
    }
  }, {
    sequelize,
    modelName: 'Hotel',
  });
  return Hotel;
};