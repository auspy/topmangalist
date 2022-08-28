require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
app.listen(process.env.PORT, () => {
  console.log("topmangalist backend started");
});
app.use(cors());
app.use(bodyParser.json());

// connect sql
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "topmangalist",
});

con.connect((err) => {
  if (err) throw err;
  console.log("sql connected");
});



app.post("/searchResults", (req, res) => {
    let q = "SELECT Name FROM "+req.body.table+" WHERE Name LIKE '%" + req.body.data + "%'";
    // let q = "DESC mangas"
    con.query(q, (err, docs) => {
      if (err) throw err;
      console.log(docs);
      // docs.forEach(doc => {
      //     console.log(doc.Name);
      // });
      res.send(docs);
    });
  });