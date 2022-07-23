const { Sequelize } = require("sequelize");
const User = require('./User');
const Plogging = require('./Plogging');
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

const sequelize = new Sequelize( //config의 db정보와 연결
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Plogging = Plogging
db.User = User;
User.init(sequelize);
Plogging.init(sequelize);
User.associate(db);
Plogging.associate(db);

module.exports = db;