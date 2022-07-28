const Sequelize = require('sequelize');

module.exports = class Trash extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            //사용자, 사용자 위치, 해당되는 플로깅 모델, 날짜
            owner: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true
            },
            latitude: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true
            },
            longitude:{
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true
            },
            plogging:{
                type: Sequelize.STRING(40),
                allowNull: false,
                unique: true
            }


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
    static associate(db){
        db.Trash.hasOne(db.Plogging);
       
    }
};