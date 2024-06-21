const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("intellisepGPt", "root", "aman@12", {
  host: "localhost",
  dialect: "mysql",
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

  module.exports = sequelize;
