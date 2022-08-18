const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        username: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        email: {
          type: Sequelize.STRING(40),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(60),
          allowNull: false,
        },
        level: {
          type: Sequelize.ENUM('초급', '중급', '고급'),
          defaultValue: '초급',
        },
        address: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        plogging: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
        trash: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        timestamps: false,
        modelName: 'User',
        tableName: 'users',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Plogging, {
      foreignKey: 'owner',
      sourceKey: 'id',
    });
    db.User.hasMany(db.Challenge, {
      foreignKey: 'owner',
      sourceKey: 'id',
    });
    db.User.hasMany(db.Board, {
      foreignKey: 'owner',
      sourceKey: 'id',
    });
    db.User.hasOne(db.File, {
      foreignKey: 'target',
      sourceKey: 'id',
    });
    db.User.belongsToMany(db.Badge, {
      foreignKey: 'owner',
      through: 'badgeStorage',
    });
  }
};
