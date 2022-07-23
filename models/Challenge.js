const Sequelize = require('sequelize');

module.exports = class Challenge extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            done: {
                type: Sequelize.DOUBLE,
                defaultValue: 0.0
            },
            goal: {
                type: Sequelize.DOUBLE,
                require: true
            },
            month: {
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            owner: {
                type: Sequelize.STRING(20),
                allowNull: false,
                unique: true
            }
		}, {
            sequelize,
            timestamps: false,
            modelName: 'Challenge',
            tableName: 'challenges',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }
    static associate(db){
        db.Challenge.belongsTo(db.User, {foreignKey: 'owner', targetKey: 'username'});
    }
};