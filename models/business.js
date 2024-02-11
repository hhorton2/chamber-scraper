import {DataTypes, Model} from 'sequelize';

export default (sequelize) => {
    class Business extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Business.belongsToMany(models.Chamber, {through: 'BusinessChamber'});
            Business.hasMany(models.Alias, {
                foreignKey: 'businessId',
                as: 'aliases', // Optional: defines an alias for the association
            });
        }
    }

    Business.init({
        name: DataTypes.STRING,
        city: DataTypes.STRING,
        address: DataTypes.STRING,
        rootChamberName: DataTypes.STRING,
        uniqueChamberListingURL: DataTypes.STRING,
        googleMapsURL: DataTypes.STRING,
        internalURLToJobAide: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Business',
    });

    return Business;
};
