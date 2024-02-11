'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BusinessChamber extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }

    BusinessChamber.init({
        businessId: DataTypes.INTEGER,
        chamberId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'BusinessChamber',
    });
    return BusinessChamber;
};