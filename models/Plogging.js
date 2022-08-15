const Sequelize = require('sequelize');

module.exports = class Plogging extends Sequelize.Model {
  static init(sequelize) {
    {
      return super.init(
        {
          owner: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          title: {
            type: Sequelize.STRING(20),
          },
          duration: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          end: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
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
    db.Plogging.belongsTo(db.User, {
      foreignKey: 'owner',
      targetKey: 'id',
    });
    db.Plogging.hasMany(db.Trash, {
      foreignKey: 'plogging',
      sourceKey: 'id',
    });
  }
};
