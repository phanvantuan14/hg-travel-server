'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Anhs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      link: {
        type: Sequelize.STRING(1000)
      },
      tenanh: {
        type: Sequelize.STRING(1000)
      },
      status: {
        type: Sequelize.INTEGER
      },
      banner: {
        type: Sequelize.INTEGER
      },
      tourId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tours', // Chú ý: tên bảng phải là số nhiều
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      hotelId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Hotels', // Chú ý: tên bảng phải là số nhiều
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('Anhs');
  }
};``