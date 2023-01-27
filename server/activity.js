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

//유저별 필터 저장 --> 개인화 부분
router.post('/preference', (req, res) => {
    const user_id = req.body.user_id; //user이름
    db.query('SELECT learn, travel, art, sports, foods, walk, chronic, breathe, surprised, people, diet FROM user WHERE login_id = ?', [user_id], function(error, results, fields) {
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
router.post('/filter', (req, res) => {
    //json 파일 형식
    // { 
    //     "learn":0,
    //     "travel":1,
    //     "art": 0,
    //     "sports":0,
    //     "foods":0,
    //     "walk":1,
    //     "chronic":0,
    //     "breathe":0,
    //     "surprised":0,
    //     "people":0,
    //     "diet":0  
    //   }

    //1/2 화면 필터링
    const learn = req.body.learn;
    const travel = req.body.travel;
    const art = req.body.art;
    const sports = req.body.sports;
    const foods = req.body.foods;
    
    //2/2 화면 필터링
    const walk = req.body.walk;
    const chronic = req.body.chronic;
    const breathe = req.body.breathe;
    const surprised = req.body.surprised;
    const people = req.body.people;
    const diet = req.body.diet;
    
    db.query('SELECT name, platform, price FROM activities WHERE activities.learn = ? AND activities.travel = ? AND activities.art = ? AND activities.sprots = ? AND activities.foods = ? AND activities.walk = ? AND activities.chronic = ? AND activities.breathe = ? AND activities.surprised = ? AND activities.people = ? AND activities.diet = ?', [learn, travel, art, sports, foods, walk, chronic, breathe, surprised, people, diet], function(error, results, fields) {
        if (error) {
            console.log("message: cannot get info from SQL");
            throw error;
        }
        console.log(JSON.parse(JSON.stringify(results)));
        console.log("success!!");
        res.send(JSON.parse(JSON.stringify(results)));
    });
});

//액티비티 상세 화면
router.post('/detail', (req, res) => {
    const name = req.body.name; //엑티비티 이름 
    db.query('SELECT name, description, location, platform, price FROM activities WHERE name = ?', [name], function(error, results, fields) {
        if (error) {
            console.log("message: cannot get info from SQL");
            throw error;
        }
        console.log(JSON.parse(JSON.stringify(results[0])));
        console.log("success!!");
        res.send(JSON.parse(JSON.stringify(results[0])));
    });
});

module.exports = router;