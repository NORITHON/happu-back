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




router.post('/changing', (req, res) => {
  const body = req.body;
  const query_id = body.id;
  const query_col = body.column;
  
  if (body!=undefined){ //아이디랑 PW 입력이 모두 있을때
    db.query(`SELECT ${query_col} FROM user WHERE login_id = '${query_id}'`, function(error, results, fields) { // DB에 같은 이름의 회원아이디가 있는지 확인
        const YorN = (JSON.parse(JSON.stringify(results[0]))[query_col]?0:1)
        console.log(JSON.parse(JSON.stringify(results[0]))[query_col])
        if (results !=undefined ) {     // signp err case 1: DB에 같은 이름의 회원아이디가 없고, 비밀번호가 올바르게 입력된 경우 
            db.query(`UPDATE user SET ${query_col} = ${YorN} WHERE login_id= '${query_id}'`, function (err, data) {
                db.query(`SELECT ${query_col} FROM user WHERE login_id = '${query_id}'`, function (errors, result) {
                    res.send(JSON.parse(JSON.stringify(result[0])))
                    console.log(JSON.parse(JSON.stringify(result[0])))
                });
            });
        } else {    // sigUp err case 2: DB에 같은 이름의 회원아이디가 있는 경우
            throw signUpErrorIdExist;  
        }            
    });
  }else {   
    throw no_input;
}
})

module.exports = router;