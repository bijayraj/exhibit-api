const Sequelize = require("sequelize");
const {
    Joi
} = require("@hapi/joi");

class Artwork extends Sequelize.Model {
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
                allowNull: false
            },
            longDescription: {
                type: DataTypes.TEXT,
            },
            artType: {
                type: DataTypes.STRING,
            },
            moreInfo: {
                type: DataTypes.STRING,
            },
            approved: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            approvedDate: {
                type: DataTypes.DATE,
            },
            approvedBy: {
                type: DataTypes.INTEGER
            },
            visible: {
                type: DataTypes.BOOLEAN
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
    //         title: Joi.string().required(),
    //         description: Joi.string(),
    //         artType: Joi.string(),
    //         moreInfo: Joi.string()
    //     });
    //     return joiObj;
    // }

    static associate(models) {
        this.belongsTo(models.Exhibit);
        this.belongsTo(models.User)
        this.hasMany(models.ArtworkAsset)
        this.hasMany(models.ArtworkApproval)
        // or
        // this.myAssociation = models.MyModel.belongsTo(models.OtherModel);
    }
}

module.exports = Artwork


