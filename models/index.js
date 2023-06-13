// const dbConfig = require("../config/db.config.js");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "postgres://postgres:postgres@db-seq:5432/db_node_sequelize_test"
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user")(sequelize, Sequelize);

module.exports = db;
