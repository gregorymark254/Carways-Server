module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "mypassword",
  DB: "carways",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
