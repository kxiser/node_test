require("dotenv").config();
// const { Pool } = require("pg");
const dbConnection = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
};
module.exports = {
  connection: dbConnection
}

// const dbh = new Pool(dbConnection);

// module.exports = {
//   query: async (query, params) => {
//     try {
//       const client = await dbh.query(query, params = []);
//       return client
//     } catch (error) {
//       console.log(error);
//     }
//   }
// };
