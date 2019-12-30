const http = require("http");
require("dotenv").config();
const { Pool, Client } = require("pg");

const dbConnection = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
};
// POSTGRES
const client = new Pool(dbConnection);

client.connect()
const query = "select count(*) from companies where subclient_id = 8988 and fulldate::date = '20191230'"
let data;
client.query(query, (err,res) => {
    data = res.rows
    console.log(data);
})
console.log(data);

client.end()

const hostname = "127.0.0.1";
const port = 3000;

// Server
const server = http.createServer((req, res) => {
  res.writeHeader(200, { "Content-Type": "application/json" });
  
  res.end(JSON.stringify({data}));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
