const Sequelize = require("sequelize");

class ExhibitAdmin extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },            
            expiryDate: {
                type: DataTypes.DATE,                
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
        this.belongsTo(models.User);
        this.belongsTo(models.Exhibit);
        
    }  

}

module.exports = ExhibitAdmin