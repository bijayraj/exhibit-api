const Sequelize = require("sequelize");

class User extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            memberId: {
                type: DataTypes.INTEGER,
            },
            firstName:{
                type: DataTypes.STRING
            },
            lastName:{
                type:DataTypes.STRING
            },
            organization:{
                type:DataTypes.STRING
            },
            occupation:{
                type:DataTypes.STRING
            },
            photoUrl:{
                type:DataTypes.STRING
            },
            role: DataTypes.STRING,
            verificationToken: {
                type: DataTypes.STRING,
                field: 'verification_token'
            },
            resetToken: {
                type: DataTypes.STRING,
                field: 'reset_token'
            },
            resetTokenExpiry: {
                type: DataTypes.DATE,
                field: 'reset_token_expiry'
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
        this.hasMany(models.RefreshToken);
        this.hasMany(models.ExhibitAdmin);
        this.belongsToMany(models.Exhibit, {through: models.ExhibitAdmin});
        this.hasMany(models.Artwork);
        // or
        // this.myAssociation = models.MyModel.belongsTo(models.OtherModel);
    }
}

module.exports = User



/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - username
 *          - role
 *          - email
 *        properties:
 *          name:
 *            type: string
 *          email:
 *            type: string
 *            format: email
 *            description: Email for the user, needs to be unique.
 *          role:
 *            type: string
 *            description: Role of the user - admin, member, external
 *        example:
 *           username: Bijay 
 *           email: fake@email.com
 *           role: 'admin'
 */