const Sequelize = require("sequelize");
const {
    Joi
} = require("@hapi/joi");

class ArtworkTag extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init({
            uuid: {
                type: DataTypes.STRING,
                primaryKey: true
            },
            active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
            location: {
                type: DataTypes.STRING,
            },
            description: {
                type: DataTypes.TEXT,
            }
        }, {
            sequelize,
            underscored: true,
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        });
    }

    static associate(models) {
        this.belongsTo(models.User)
        this.belongsTo(models.Artwork)
        this.hasMany(models.ArtworkApproval)
    }
}

module.exports = ArtworkTag


