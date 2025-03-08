'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Hotels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(500)
      },
      diachi: {
        type: Sequelize.STRING(500)
      },
      sdt: {
        type: Sequelize.STRING(500)
      },
      email: {
        type: Sequelize.STRING(500)
      },
      giaphong: {
        type: Sequelize.INTEGER
      },
      avatar: {
        type: Sequelize.STRING(5000)
      },
      tenanh: {
        type: Sequelize.STRING(1000)
      },
      chitiethotel: {
        type: Sequelize.TEXT
      },
      luuy: {
        type: Sequelize.TEXT
      },
      vitri: {
        type: Sequelize.INTEGER
      },
      bando: {
        type: Sequelize.STRING(5000)
      },
      thoigian: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Hotels');
  }
};