const Sequelize = require("sequelize");
const {
    Joi
} = require("express-validation");

class ArtworkAsset extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: false
            },
            assetType: {
                type: DataTypes.ENUM,
                values: [0, 1, 2, 3, 4, 5, 6],
                defaultValue: 0,
                allowNull: false
            },
            visible: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
            approved: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            approvedDate: {
                type: DataTypes.DATE,
            },
            autoPlay: {
                type: DataTypes.BOOLEAN
            },
            displayOrder: {
                type: DataTypes.INTEGER
            },
            longDescription: {
                type: DataTypes.TEXT
            },
            onlyInHeadphone: {
                type: DataTypes.BOOLEAN
            },
            approvedBy: {
                type: DataTypes.INTEGER
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
    // static get validationCreate() {
    //     const joiObj = Joi.object({
    //         description: Joi.string().required(),
    //         address: Joi.string().required(),
    //         assetType: Joi.number().required(),
    //         visible: Joi.boolean(),
    //     });
    //     return joiObj;
    // }

    static associate(models) {
        this.belongsTo(models.Artwork);
    }
}

module.exports = ArtworkAsset


