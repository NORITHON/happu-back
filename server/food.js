const express = require('express')
const mysql = require('mysql')
const router = express.Router();

const db =mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});


router.use(express.json())
router.use(cookieParser());
router.use(express.urlencoded())


  router.get("", (req, res) => {
    db.query(`SELECT * FROM foods`, (err, data) => {
      if(err) throw err;
      res.write(JSON.stringify(data));
      res.end();
    });
  });

  router.get("/:id", (req, res) => {
    const query_id = req.params.id;
    db.query(`SELECT * FROM foods WHERE id=${query_id}`, (err, data) => {
      if(err) throw err;
      res.write(JSON.stringify(data));
      res.end();
    });
  })

  router.post("", (req, res) => {
    const body = req.body;
    db.query(`INSERT INTO foods (name, kcal, isVegan) VALUES ('${body.name}', '${body.kcal}', '${body.isVegan}')`, (err, results) => {
          if(err) throw err;
          res.end();
        });
  });

  router.put("/:id", (req, res) => {
    const body = req.body;
    const query_id = req.params.id;
    db.query(`UPDATE foods SET name='${body.name}', kcal='${body.kcal}', isVegan='${body.isVegan}' WHERE id=${query_id}`, (err, data) => {
      if(err) throw err;
      res.end();
    });
  })

  router.delete("/:id", (req, res) => {
    const query_id = req.params.id;
    db.query(`DELETE FROM foods WHERE id=${query_id}`, (err, data) => {
      if(err) throw err;
      res.end();
    })
  })

  module.exports = router;