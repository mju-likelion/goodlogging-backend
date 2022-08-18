const Sequelize = require('sequelize');

module.exports = class File extends Sequelize.Model {
  static init(sequelize) {
    {
      return super.init(
        {
          owner: {
            type: Sequelize.INTEGER,
            allowNull: false,
            required: true,
          },
          fileName: {
            type: Sequelize.STRING(50),
            allowNull: false,
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
    db.File.belongsTo(db.User, {
      foreignKey: 'owner',
      targetKey: 'id',
    });
  }
};
