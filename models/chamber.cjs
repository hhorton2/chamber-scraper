'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Chamber extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Chamber.belongsToMany(models.Business, {through: 'BusinessChamber'});
        }
    }

    Chamber.init({
        name: DataTypes.STRING,
        location: DataTypes.STRING,
        description: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Chamber',
    });
    return Chamber;
};