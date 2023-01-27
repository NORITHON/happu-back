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
router.use(express.json())
router.use(express.urlencoded())



//예약자 정보 db에 저장
router.post('/signin', (req, res) => {
    const id = req.id;
    const activity = body.activity;
    const info = body.info;
    const number = body.number;
    const startDate = body.startDate;
    const endDate = body.endDate;
    const timestamp = ""

     
    db.query('INSERT INTO reservation (username, password) VALUES(?,?,?,?,?)', [id, activity, info, number, startDate, endDate], function (error, data) {
        if (error) {
            console.log("message: cannot get info from SQL");
            throw error2;
        }
        request.session.is_logined;
        //insertion 성공한 경우
    });
    

});

//회원가입 프로세스
router.post('/signup', (req, res) => {
    const id = req.id;
    const activity = body.activity;
    const info = body.info;
    const number = body.number;
    const startDate = body.startDate;
    const endDate = body.endDate;

    db.query('SELECT * FROM reservation WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
       
    });

})

module.exports = router;