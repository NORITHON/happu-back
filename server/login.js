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



//로그인 프로세스
router.post('/signin', (req, res) => {
    const body = req.body;
    const query_id = body.id;
    const query_pw = body.password;
  
    if(query_id && query_pw){ //비밀번호가 입력된다면

    db.query('SELECT * FROM user WHERE login_id = ? AND login_pw = ?', [query_id, query_pw], (err, result)=>{
      if (err) throw err;
      if (result.length > 0) { 
        console.log(result)
      res.send(result)
      }
      else{
        throw loginErrorNoIdPw;
      }
    })

    } else { //login err case 2
        //로그린 PW,ID 입력이 아예 없고 로그인을 눌렀을 때
        throw loginErrorNoIdPw;
    }
});

//회원가입 프로세스
router.post('/signup', (req, res) => {
  const body = req.body;
  const query_id = body.id;
  const query_pw = body.password;
  const query_name = body.name;

  if (query_id && query_pw){ //아이디랑 PW 입력이 모두 있을때
    db.query('SELECT * FROM user WHERE login_id = ?', [query_id], function(error, results, fields) { // DB에 같은 이름의 회원아이디가 있는지 확인
        if (error) throw error;
        if (results.length <= 0) {     // signp err case 1: DB에 같은 이름의 회원아이디가 없고, 비밀번호가 올바르게 입력된 경우 
            db.query('INSERT INTO user (login_id, login_pw, name) VALUES(?,?,?)', [query_id, query_pw, query_name], function (error, data) {
                if (error) throw error;
                console.log(body)
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