const express = require('express');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');
const router = express.Router();
const cors = require('cors');

require('dotenv').config();

var db =mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

router.use(cors());
router.use(cookieParser());
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

//필터 배열 버튼 정보
router.post('/preference', (req, res) => {
    const user_id = req.body.user_id; //user이름
    db.query('SELECT learnig, travel, art, sports, foods, walk, chronic, breathe, surprised, people, diet FROM user WHERE login_id = ?', [user_id], function(error, results, fields) {
        if (error) {
            console.log("message: cannot get info from SQL");
            throw error;
        }
        console.log(JSON.parse(JSON.stringify(results[0])));
        console.log("success!!");
        res.send(JSON.parse(JSON.stringify(results[0])));
    });
});

//filter 동작 구현
router.post('/result', (req, res) => {
    //1/2 화면 필터링
    const learnNew = req.body.learnNew;
    const trip = req.body.trip;
    const art = req.body.art;
    const exercise = req.body.exercise;
    const food = req.body.food;
    
    //2/2 화면 필터링
    const walk = req.body.walk;
    const patient = req.body.healthy;
    // const art = req.body.trip;
    // const exercise = req.body.exercise;
    // const food = req.body.food;
    
    // db.query('SELECT name, description, location, platform, price FROM activities WHERE name = ?', [name], function(error, results, fields) {
    //     if (error) {
    //         console.log("message: cannot get info from SQL");
    //         throw error;
    //     }
    //     console.log(JSON.parse(JSON.stringify(results[0])));
    //     console.log("success!!");
    //     res.send(JSON.parse(JSON.stringify(results[0])));
    // });
});

module.exports = router;