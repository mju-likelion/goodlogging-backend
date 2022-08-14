const Sequelize = require('sequelize');

module.exports = class Trash extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        district: {
          //시 군 구 의 구 입니다.
          type: Sequelize.STRING(8),
        },
        latitude: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: false,
        },
        longitude: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: false,
        },
        plogging: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: 'Trash',
        tableName: 'trashes',
        paranoid: false,
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
      }
    );
  }
  static associate(db) {
    db.Trash.belongsTo(db.Plogging, {
      foreignKey: 'plogging',
      targetKey: 'id',
    });
  }
};
