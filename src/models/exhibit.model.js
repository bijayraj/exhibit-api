const Sequelize = require("sequelize");
const {
    Joi
} = require("express-validation");

class Exhibit extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            location: {
                type: DataTypes.STRING,
            },
            address:{
                type: DataTypes.STRING
            },
            visible:{
                type:DataTypes.BOOLEAN,
                defaultValue: true
            },
            startDate:{
                type:DataTypes.DATE,
                allowNull: false
            },
            endDate:{
                type:DataTypes.DATE
            },
            moreInfo:{
                type:DataTypes.STRING
            }
            

        }, {
            sequelize,
            underscored: true,
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        });
    }

    //This is used in route validation! 
    static get validationCreate() {
        const joiObj = Joi.object({
            name: Joi.string().required(),
            description: Joi.string(),
            addressLine: Joi.string(),
            details: Joi.string().required(),
            visible: Joi.boolean(),
            startDate: Joi.date().required(),
            endDate: Joi.date(),
            moreInfo: Joi.string()
        });
        return joiObj;
    }

    static associate(models) {
        this.hasMany(models.ExhibitAdmin);
        this.belongsToMany(models.User, {through: models.ExhibitAdmin});
        this.hasMany(models.Artwork);
        // or
        // this.myAssociation = models.MyModel.belongsTo(models.OtherModel);
    }
}

module.exports = Exhibit


