const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            username: {
                type: Sequelize.TEXT,
                allowNull: false,
                unique: true
            },
            email: {
                type: Sequelize.TEXT,
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            level: {
                type: Sequelize.ENUM("beginner", "intermediate", "expert"),
                defaultValue: "beginner"
            },
            address: {
                type: Sequelize.TEXT,
                allowNull: false
            }
		}, {
            sequelize,
            timestamps: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db){
    }
};