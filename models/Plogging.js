const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        {
           
        return super.init({
            owner:{
                type: Sequelize.STRING(20),
                allowNull:false,
                unique:true,
            },
            date:{
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            duration:{
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            trash: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            
		}, {
            sequelize,
            timestamps: true,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
}
    static associate(db){
        db.User.hasMany(db.User, {foreignKey:'owner' , targetKey:'username'})
        
    }
};