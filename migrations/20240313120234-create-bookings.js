'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      table_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Tables',
          key: 'id'
        }
      },
      fromYear: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fromMonth: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fromDay: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fromHour: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      toYear: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      toMonth: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      toDay: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      toHour: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Bookings');
  }
};