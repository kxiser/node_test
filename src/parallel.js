const { connection } = require("./db");

const { Pool } = require("pg");
const dbh = new Pool(connection);

// PDO
// const sql = require("yesql");
const prepare = require("yesql").pg;

// QUERIES
const { getClient } = require("./queries");

// SERVER EXPRESS
const express = require("express");
const app = express();

// ""FETCH""
const axios = require("axios");
const fetch = require("node-fetch");
// RENDER TEMPLATES (VIEWS)
const hbs = require("hbs");
app.set("view engine", "hbs"); //Establece que express leera los archivos .hbs y los renderizara
// app.set('view engine', 'hbs');
// app.engine('html', require('hbs').__express);
const port = 5050;

// SERVER EXPRESS
app.get("/", (req, res) => {
  console.log(req);
  res.render("index");
});

// servicio
app.post("/getClientsById/:id", async (req, res) => {
  const { id } = req.params;
  const { rows } = await dbh.query(prepare(getClient)({ id: id }));
  await res.json(rows);
});



// template
app.get("/getClients", async (req, res) => {
  let id = 8987;
  /*const { data } = await axios.get(
    `${window.location.host}/getClientsById/${id}`
  );*/
  const data = await Promise.all([(async () => {
    try {
      const result = await fetch(`http://localhost/nodejs?sid=2975&startdate=20191231`);
      let resultado =  await result.json();
      return resultado;
    } catch (e) {
      console.log(e);
    }
  })()]);
  console.table(data[0].rows);
  //console.log(data2);
  //res.render("getClients", { data });
});

// MAIN
app.listen(port, console.log(`Server on port ${port}`));
