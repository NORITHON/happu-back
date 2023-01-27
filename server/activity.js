const express = require('express');
const cookieParser = require('cookie-parser');
const mysql = require('mysql');
const router = express.Router();
const cors = require('cors');
const e = require('express');

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
    // json 파일 형식
    // { 
        
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
//     const bodyPass = {};
//     bodyPass[0] = req.body.learn;
//     bodyPass[1] = req.body.travel;
//     bodyPass[2]= req.body.art;
//     bodyPass[3] = req.body.sports;
//     bodyPass[4] = req.body.foods;
    
//     //2/2 화면 필터링
//     const walk = req.body.walk;
//     const chronic = req.body.chronic;
//     const breathe = req.body.breathe;
//     const surprised = req.body.surprised;
//     const people = req.body.people;
//     const diet = req.body.diet;
    
// //     db.query('SELECT name, platform, price FROM activities WHERE activities.learn = ? OR activities.travel = ? OR activities.art = ? OR activities.sports = ? OR activities.foods = ? OR activities.walk = ? OR activities.chronic = ? OR activities.breathe = ? OR activities.surprised = ? OR activities.people = ? OR activities.diet = ?', [learn, travel, art, sports, foods, walk, chronic, breathe, surprised, people, diet], function(error, results, fields) {
// //         if (error) {
// //             console.log("message: cannot get info from SQL");
// //             throw error;
// //         }
// //         console.log(JSON.parse(JSON.stringify(results)));
// //         console.log("success!!");
// //         res.send(JSON.parse(JSON.stringify(results)));
// //     });
// // });

// // //액티비티 상세 화면
// // router.post('/detail', (req, res) => {
// //     const name = req.body.name; //엑티비티 이름 
// //     db.query('SELECT name, description, location, platform, price FROM activities WHERE name = ?', [name], function(error, results, fields) {
// //         if (error) {
// //             console.log("message: cannot get info from SQL");
// //             throw error;
// //         }
// //         console.log(JSON.parse(JSON.stringify(results[0])));
// //         console.log("success!!");
// //         res.send(JSON.parse(JSON.stringify(results[0])));
// //     });

//     //user_id body로 받아오기
//     var category1 ={};
//     const oneList = {};
//     const user = req.body.login_id;
//     db.query('SELECT * FROM user WHERE login_id =?', [user] , function(error, results, fields) {
//         if (error) {
//             console.log("message: cannot get info from SQL");
//             throw error;
//         }
//         console.log(results);

//         // 첫번째 페이지
//         const learn = results[0].learn;
//         category1.feature[0] = "learn";
//         category1.label[0] = learn;

//         const travel = results[0].travel;
//         category1.feature[1] = "travel";
//         category1.label[1] = travel;

//         const art = results[0].art;
//         category1.feature[2] = "art";
//         category1.label[2] = art;

//         const sports = results[0].sports;
//         category1.feature[3] = "sports";
//         category1.label[3] = sports;

//         const foods = results[0].foods;
//         category1.feature[4] = "foods";
//         category1.label[4] = foods;

//         const cnt = 0;

//         console.log(category1);

//         for (let i = 0; i < 5; i++) {
//             if(category1.label[i] == 1){
//                 final['label'] = category1.feature[i];
//                 cnt = cnt+1;
//             }
//         }

//         if(cnt == 0){
//             console.log("is zero");
//         }else if(cnt == 1){
//             db.query('SELECT * FROM activities WHERE ? = ?', [final.label[0], bodyPass[0]] , function(error, results, fields){
//                 console.log(results);
//             });
//         }else if (cnt == 2){
//             db.query('SELECT * FROM activities WHERE  ? = ? OR ? = ?', [final.label[0], bodyPass[0], final.label[1], bodyPass[1]] , function(error, results, fields){
//                 console.log(results);
//             });
//         }else if (cnt == 3){
//             db.query('SELECT * FROM activities WHERE ? = ? OR ? = ? OR ? = ?', [final.label[0], bodyPass[0], final.label[1], bodyPass[1], final.label[2], bodyPass[2]] , function(error, results, fields){
//                 console.log(results);
//             });
//         }else if (cnt == 4){
//             db.query('SELECT * FROM activities WHERE ? = ? OR ? = ? OR ? = ? OR ? = ?', [final.label[0], bodyPass[0], final.label[1], bodyPass[1], final.label[2], bodyPass[2], final.label[3], bodyPass[3]] , function(error, results, fields){
//                 console.log(results);
//             });
//         }else{
//             db.query('SELECT * FROM activities WHERE ? = ? OR ? = ? OR ? = ? OR ? = ? OR ? = ?', [final.label[0], bodyPass[0], final.label[1], bodyPass[1], final.label[2], bodyPass[2], final.label[3], bodyPass[3], final.label[4], bodyPass[4]] , function(error, results, fields){
//                 console.log(results);
//             });
//         }
//     });

//데모용
    const user = req.body.login_id;
    db.query('SELECT * FROM user WHERE login_id =?', [user] , function(error, results, fields) {
        if (error) {
            console.log("message: cannot get info from SQL");
            throw error;
        }
        console.log(results);

        const learn = results[0].learn;
        const travel = results[0].travel;
        const art = results[0].art;
        const sports = results[0].sports;
        const foods = results[0].foods;

        const walk = results[0].learn;
        const chronic = results[0].chronic;
        const breathe = results[0].breathe;
        const surprised = results[0].surprised;
        const people = results[0].people;
        const diet = results[0].learn;

        db.query('SELECT t.name, t.description, t.type, t.location, t.platform, t.price FROM (SELECT * FROM activities WHERE activities.learn = ? OR activities.travel = ?) t where t.surprised =?', [learn, travel,diet,surprised] , function(error, results, fields) {
            console.log(JSON.parse(JSON.stringify(results)));
            console.log("success!!");
            res.send(JSON.parse(JSON.stringify(results)));
        });
    });
});

module.exports = router;