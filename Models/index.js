const dbConfig = require("../Db/dbconfig");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.bookingInfo = require("./booking")(sequelize, Sequelize);
db.billingInfo = require("./billing")(sequelize, Sequelize);
// db.paymentInfo = require("./payment")(sequelize, Sequelize);


module.exports = db;
