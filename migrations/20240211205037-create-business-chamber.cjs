'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('BusinessChambers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            businessId: {
                type: Sequelize.INTEGER
            },
            chamberId: {
                type: Sequelize.INTEGER
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
        await queryInterface.addIndex('BusinessChambers', ['businessId', 'chamberId'], {
            unique: true,
            name: 'unique_business_per_chamber'
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('BusinessChambers');
    }
};