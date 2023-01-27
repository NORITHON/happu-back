const express = require('express');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');
const cors = require('cors');

require('dotenv').config();

var db =mysql.createConnection({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded())


app.get('/', (req, res) => { //예약자 정보 저장 
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
        //insertion 성공한 경우
    });
    
    

})

app.get('/', (req, res) => { //예약자 정보 꺼내기 
    const id = req.id;
    const activity = body.activity;
    const info = body.info;
    const number = body.number;
    const startDate = body.startDate;
    const endDate = body.endDate;

    db.query('SELECT * FROM reservation WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
       
    });
})