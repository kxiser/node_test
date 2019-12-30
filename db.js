require("dotenv").config();
const { Pool } = require("pg");
const dbConnection = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
};
const dbh = new Pool(dbConnection);

module.exports = {
  query: (query, params) => {
    try {
      return dbh.query(query, params = []);
    } catch (error) {
      console.log(error);
    }
  }
};
