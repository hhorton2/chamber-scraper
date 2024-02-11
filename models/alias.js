import {DataTypes, Model} from 'sequelize';

export default (sequelize) => {
    class Alias extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Alias.belongsTo(models.Business, { // Assuming 'Business' is the name of your business model
                foreignKey: 'businessId', // This is the foreign key in the Alias model that refers to the Business model
                as: 'business', // Optional: Defines an alias for the association which can be used in include queries
                onDelete: 'CASCADE', // Optional: Specifies action when referenced business is deleted. Adjust as needed.
            });
        }
    }

    Alias.init({
        name: DataTypes.STRING,
        businessId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Businesses', // Name of the table as defined in the Business model migration file
                key: 'id', // Key in the Business table that Alias.businessId refers to
            },
            onDelete: 'CASCADE' // Ensures deletion of alias if the associated business is deleted. Adjust as necessary.
        }
    }, {
        sequelize,
        modelName: 'Alias',
    });

    return Alias;
};
