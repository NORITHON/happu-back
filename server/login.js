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
   console.log(body)
    if(query_id && query_pw){ //비밀번호가 입력된다면

    db.query('SELECT * FROM user WHERE login_id = ? AND login_pw = ?', [query_id, query_pw], (err, result)=>{
      if (err) throw new Error('someError');
      if (result.length > 0) { 
        console.log(JSON.parse(JSON.stringify(result)))
      res.send(JSON.parse(JSON.stringify(result))[0])
      }
      else{
        throw new Error('someError');
      }
    })
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
        if (error) throw new Error('something')
        if (results.length <= 0) {     
            db.query('INSERT INTO user (login_id, login_pw, name) VALUES(?,?,?)', [query_id, query_pw, query_name], function (error, data) {
                if (error) throw new Error('something')
                console.log(body)
            });
        } else {  
          throw new Error('이미 존재하는 id')
        }            
    });
  }
})

module.exports = router;