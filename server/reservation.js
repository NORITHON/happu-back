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



//예약자 정보 db에 저장
router.put('/insert', (req, res) => {
    const name = req.body.name; //예약자 이름 
    const activity = req.body.activity; //활동명
    const people = req.body.people; //인원수
    const startDate = req.body.startDate; //시작일
    const endDate = req.body.endDate; //종료일
     
    db.query('INSERT INTO reservation (name, activity, people, startDate, endDate) VALUES(?,?,?,?,?)', [name, activity, people, startDate, endDate], function (error, data) {
        if (error) {
            console.log("message: cannot insert info to SQL");
            throw error;
        }
        console.log("information insertion success");
    });
    

});

//회원가입 프로세스
router.post('/info', (req, res) => {
    const name = req.body.name; //예약자 이름 

    db.query('SELECT * FROM reservation WHERE name = ?', [name], function(error, results, fields) {
        if (error) {
            console.log("message: cannot get info from SQL");
            throw error;
        }
        console.log(JSON.parse(JSON.stringify(results)));
        res.send(JSON.parse(JSON.stringify(results)));
    });

})

module.exports = router;