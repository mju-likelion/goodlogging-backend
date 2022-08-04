const Sequelize = require('sequelize');

module.exports = class Plogging extends Sequelize.Model {
  static init(sequelize) {
    {
      return super.init(
        {
          owner: {
            type: Sequelize.STRING(20),
            allowNull: false,
            unique: false,
          },
          duration: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
        },
        {
          sequelize,
          timestamps: true,
          modelName: 'Plogging',
          tableName: 'ploggings',
          paranoid: false,
          charset: 'utf8mb4',
          collate: 'utf8mb4_general_ci',
        }
      );
    }
  }
  static associate(db) {
    db.Plogging.hasMany(db.Trash);
    db.Plogging.belongsTo(db.User, {
      foreignKey: 'owner',
      targetKey: 'username',
    });
  }
};
