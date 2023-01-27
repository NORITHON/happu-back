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


app.get('/', (req, res) => {
  console.log(req.cookies)
  res.sendFile(__dirname + "/view/index.html")
})

app.get('/secret', (req, res) => {
  const cookie_id = req.cookies.id;
  const cookie_pw = req.cookies.password;

  db.query(`SELECT * FROM user WHERE login_id='${cookie_id}'`, (err, data) =>{
    const dataset2= JSON.stringify(data);
    const users2=JSON.parse(dataset2)[0];
    if(users2!=undefined){
      if(users2.login_pw==cookie_pw){
      res.sendFile(__dirname + "/view/secret_file.html")
    }
  }else {
    res.redirect(301, "/");
  }
  });
})

//로그인 프로세스
app.post('/login', (req, res) => {
    const body = req.body;
    const query_id = body.id;
    const query_pw = body.password;
  
    if(query_id && query_pw){ //비밀번호가 입력된다면
    
        db.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {       // db에서의 반환값이 있으면 로그인 성공
                request.session.is_logined = true;      // 세션 정보 갱신
                request.session.nickname = username;

                //쿠기 발급
                res.cookie('id', query_id);
                res.cookie('password', query_pw);

                request.session.save(function () {
                    response.redirect(`/`);
                });
            } else { //login err case 1
                //로그인 PW,ID 정보가 없을때
                throw loginErrorIdPw;  
            }
        });
    } else { //login err case 2
        //로그린 PW,ID 입력이 아예 없고 로그인을 눌렀을 때
        throw loginErrorNoIdPw;
    }
});

//회원가입 프로세스
app.post('/signup', (req, res) => {
  const body = req.body;
  const query_id = body.id;
  const query_pw = body.password;

  if (query_id && query_pw){ //아이디랑 PW 입력이 모두 있을때
    db.query('SELECT * FROM user WHERE username = ?', [query_id], function(error, results, fields) { // DB에 같은 이름의 회원아이디가 있는지 확인
        if (error) throw error;
        if (results.length <= 0) {     // signp err case 1: DB에 같은 이름의 회원아이디가 없고, 비밀번호가 올바르게 입력된 경우 
            db.query('INSERT INTO usertable (username, password) VALUES(?,?)', [username, password], function (error, data) {
                if (error) throw error2;
                response.send(`<script type="text/javascript">alert("회원가입이 완료되었습니다!");
                document.location.href="/";</script>`);
            });
        } else {    // sigUp err case 2: DB에 같은 이름의 회원아이디가 있는 경우
            throw signUpErrorIdExist;  
        }            
    });
  }else {   // signUp err case 3: 
    response.send(`<script type="text/javascript">alert("입력되지 않은 정보가 있습니다."); 
    document.location.href="/auth/register";</script>`);
}
})

app.listen(8080, () => console.log("Server is listening on 8080 port..."));