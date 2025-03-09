'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Hoadons', 'status', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
      allowNull: false
    });

    // Cập nhật tất cả record cũ với status = 0
    await queryInterface.sequelize.query(
      `UPDATE Hoadons SET status = 0 WHERE status IS NULL`
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Hoadons', 'status');
  }
};