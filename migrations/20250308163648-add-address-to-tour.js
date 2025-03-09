'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Tours', 'noikhoihang', {
      type: Sequelize.STRING(5000),
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Tours', 'noikhoihang');
  }
};
