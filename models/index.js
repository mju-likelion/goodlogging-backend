const { Sequelize } = require("sequelize");
const User = require('./User');
const Plogging = require('./Plogging');
const Challenge = require('./Challenge');
const Trash = require('./Trash');
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
db.Trash = Trash;
db.User = User;
db.Challenge = Challenge;
db.Plogging = Plogging;
Challenge.init(sequelize);
User.init(sequelize);
Plogging.init(sequelize);
Trash.init(sequelize);
User.associate(db);
Plogging.associate(db);
Challenge.associate(db);
Trash.associate(db);

module.exports = db;