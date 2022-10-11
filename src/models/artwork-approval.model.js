const Sequelize = require("sequelize");

class ArtworkApproval extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            approvedBy: {
                type: DataTypes.INTEGER
            },
            approvedDate: {
                type: DataTypes.DATE
            },
            rejected: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            comment: {
                type: DataTypes.TEXT
            },
            emailNotified: {
                type: DataTypes.BOOLEAN
            },
            additionalEmailMessage: {
                type: DataTypes.TEXT
            },
            resolved: {
                type: DataTypes.BOOLEAN
            },
            resolveRequest: {
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

    static associate(models) {
        this.belongsTo(models.Artwork);
        this.belongsTo(models.User)
    }

}

module.exports = ArtworkApproval