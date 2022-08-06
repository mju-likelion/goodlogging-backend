const Sequelize = require('sequelize');

module.exports = class Badge extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(20),
          allowNull: false,
        },
        description: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        owner: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        condition: {
          type: Sequelize.STRING(150),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'Badge',
        tableName: 'badges',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }
  static associate(db) {
    db.Badge.hasOne(db.File, {
      foreignKey: 'target',
      sourceKey: 'id',
    });
    db.Badge.belongsToMany(db.User, {
      foreignKey: 'badge',
      through: 'badgeStorage',
    });
  }
};
