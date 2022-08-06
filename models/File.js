const Sequelize = require('sequelize');

module.exports = class File extends Sequelize.Model {
  static init(sequelize) {
    {
      return super.init(
        {
          // 챌린지가 될 수도 있고, 게시물이 될 수도 있고, 플로깅이 될 수도 있고..
          target: {
            type: Sequelize.INTEGER,
            allowNull: false,
            required: true,
          },
          fileName: {
            type: Sequelize.STRING(50),
            allowNull: false,
          },
          fileUrl: {
            type: Sequelize.STRING(500),
          },
        },
        {
          sequelize,
          timestamps: false,
          modelName: 'File',
          tableName: 'files',
          paranoid: false,
          charset: 'utf8mb4',
          collate: 'utf8mb4_general_ci',
        }
      );
    }
  }
  static associate(db) {
    db.File.belongsTo(db.Challenge, {
      foreignKey: 'target',
      targetKey: 'id',
    });
    db.File.belongsTo(db.Plogging, {
      foreignKey: 'target',
      targetKey: 'id',
    });
    db.File.belongsTo(db.User, {
      foreignKey: 'target',
      targetKey: 'id',
    });
    db.File.belongsTo(db.Badge, {
      foreignKey: 'target',
      targetKey: 'id',
    });
  }
};
