const { connection } = require("./db");
const dbh = require("./db");

// PDO
const sql = require("yesql");
const prepare = require("yesql").pg;

const express = require("express");
const app = express();

const port = 5050;

const queryCompanies = `select id, title, fulldate::date, subclient_id, main_tema_id
                        from companies
                        where subclient_id in ($1, $2)
                        and fulldate::date = '$3'
                        order by fulldate::date $4`;

// SERVER EXPRESS
app.get("/", (req, res) => {
  res.send("get petition");
});
app.get("/getCompanies/:id/:sister/:date/:order", async (req, res) => {
  const { id, sister, date, order } = req.params;
  const params = [id, sister, date, order];
  const { rows } = await dbh.query(
    `select id, title, fulldate::date, subclient_id, main_tema_id
                                    from companies
                                    where subclient_id in (${id}, ${sister})
                                    and fulldate::date = '${date}'
                                    order by fulldate::date ${order}`,
    params
  );
  res.json({ rows });
});

// MAIN
app.listen(port, console.log(`Server on port ${port}`));
