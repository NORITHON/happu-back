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

const router = express();
router.use(cors());
router.use(cookieParser());
router.use(express.json());
router.use(express.urlencoded());

//로그인 프로세스
router.post('/login', (req, res) => {
    const body = req.body;
    const query_id = body.id;
    const query_pw = body.password;
  
    if(query_id && query_pw){ //비밀번호가 입력된다면
    
        db.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {       // db에서의 반환값이 있으면 로그인 성공
                // request.session.is_logined = true;      // 세션 정보 갱신
                // request.session.nickname = username;

                // //쿠기 발급
                // res.cookie('id', query_id);
                // res.cookie('password', query_pw);

                // request.session.save(function () {
                //     response.redirect(`/`);
                // });

                //로그인 성공 
                res.write(JSON.stringify(data));
                res.end();
            } else { //login err case 1
                //일치하는 로그인 PW,ID 정보가 없을때
                throw loginErrorIdPw;  
            }
        });
    } else { //login err case 2
        //로그인 PW,ID 입력이 아예 없고 로그인을 눌렀을 때
        throw loginErrorNoIdPw;
    }
});

//회원가입 프로세스
router.post('/signup', (req, res) => {
  const body = req.body;
  const query_id = body.id;
  const query_pw = body.password;

  if (query_id && query_pw){ //아이디랑 PW 입력이 모두 있을때
    db.query('SELECT * FROM user WHERE username = ?', [query_id], function(error, results, fields) { // DB에 같은 이름의 회원아이디가 있는지 확인
        if (error) throw error;
        if (results.length <= 0) { //DB에 입력된 정보 없어서 새로운 회원가입 
            db.query('INSERT INTO usertable (username, password) VALUES(?,?)', [username, password], function (error, data) {
                if (error) throw error2;
                res.write(JSON.stringify(data));
                res.end();
                //회원가입 성공
            });
        } else {    // sigUp err case 1: DB에 같은 이름의 회원아이디가 있는 경우
            throw signUpErrorIdExist;  
        }            
    });
  }else {   // signUp err case 2: 아이디랑 PW 입력이 비었을떄
    throw signUpError;
}
})

router.listen(8080, () => console.log("Server is listening on 8080 port..."));