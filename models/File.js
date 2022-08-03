const Sequelize = require('sequelize');

module.exports = class File extends Sequelize.Model {
  static init(sequelize) {
    {
      return super.init(
        {
          owner: {
            type: Sequelize.STRING(20),
            allowNull: false,
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
  static associate(db) {}
};
