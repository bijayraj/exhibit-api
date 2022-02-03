const Sequelize = require("sequelize");
const User = require("./user.model");

class RefreshToken extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init({
            token: DataTypes.STRING,
            expiryDate: {
                type: DataTypes.DATE,
                field: 'expiry_date'
            },
            createdByIp: {
                type: DataTypes.STRING,
                field: 'created_by_ip'
            },
            revokedDate: {
                type: DataTypes.DATE,
                field: 'revoked_date'
            },
            revokedByIp: {
                type: DataTypes.STRING,
                field: 'revoked_by_ip'
            },
            replacedByToken: {
                type: DataTypes.STRING,
                field: 'replaced_by_token'
            },
        }, {
            sequelize,
            underscored: true,
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        });
    }

    static associate(models) {
        this.myAssociation = this.belongsTo(models.User);
    }

    get isExpired() {
        if (this.expiryDate) {
            return Date.now() >= this.expiryDate;
        }
        return false;
    }

    get isActive() {
        return !this.revokedDate && !this.isExpired;
    }

    get mydate() {
        return this.token;
    }
}

module.exports = RefreshToken