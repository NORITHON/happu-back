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
    // const bodyPass = {};
    // bodyPass[0] = req.body.learn;
    // bodyPass[1] = req.body.travel;
    // bodyPass[2]= req.body.art;
    // bodyPass[3] = req.body.sports;
    // bodyPass[4] = req.body.foods;
    
    // //2/2 화면 필터링
    // const walk = req.body.walk;
    // const chronic = req.body.chronic;
    // const breathe = req.body.breathe;
    // const surprised = req.body.surprised;
    // const people = req.body.people;
    // const diet = req.body.diet;
    
    // db.query('SELECT name, platform, price FROM activities WHERE activities.learn = ? OR activities.travel = ? OR activities.art = ? OR activities.sports = ? OR activities.foods = ? OR activities.walk = ? OR activities.chronic = ? OR activities.breathe = ? OR activities.surprised = ? OR activities.people = ? OR activities.diet = ?', [learn, travel, art, sports, foods, walk, chronic, breathe, surprised, people, diet], function(error, results, fields) {
    //     if (error) {
    //         console.log("message: cannot get info from SQL");
    //         throw error;
    //     }
    //     console.log(JSON.parse(JSON.stringify(results)));
    //     console.log("success!!");
    //     res.send(JSON.parse(JSON.stringify(results)));
    // });

        //user_id body로 받아오기
        const feature = new Array(11);
        const label = new Array(11);
        const final = new Array(11);
        const user = req.body.login_id;
        db.query(`CREATE TABLE if not exists ${user}filter LIKE activities;`, function(error, results, fields) {
            console.log("creation success");
        });
        db.query('SELECT * FROM user WHERE login_id =?', [user] , function(error, results, fields) {
            if (error) {
                console.log("message: cannot get info from SQL");
                throw error;
            }
            console.log(results);

            // 첫번째 페이지
            const learn = results[0].learn;
            feature[0] = "learn";
            label[0] = learn;

            const travel = results[0].travel;
            feature[1] = "travel";
            label[1] = travel;

            const art = results[0].art;
            feature[2] = "art";
            label[2] = art;

            const sports = results[0].sports;
            feature[3] = "sports";
            label[3] = sports;

            const foods = results[0].foods;
            feature[4] = "foods";
            label[4] = foods;

            var cnt = 0;

            console.log("feature: "+feature);
            console.log("label: "+label);

            for (let i = 0; i < 5; i++) {
                if(label [i] == 1){
                    final[cnt] = feature[i];
                    cnt = cnt+1;
                }
            }
            console.log("final: "+typeof final[0]+" cnt: "+ cnt);
            
            JSON.stringify()

            if(cnt == 0){
                db.query(`INSERT INTO ${user}filter SELECT * FROM activities`, function(error, results){
                    console.log(results);
                });
            }else if(cnt == 1){
                db.query(`INSERT INTO ${user}filter SELECT * FROM activities WHERE ${final[0]} = 1`, function(error, results){
                    console.log(results);
                });
            }else if (cnt == 2){
                db.query(`INSERT INTO ${user}filter SELECT * FROM activities WHERE ${final[0]} = 1 OR ${final[1]} = 1`, function(error, results){
                    console.log(results);
                });
            }else if (cnt == 3){
                db.query(`INSERT INTO ${user}filter SELECT * FROM activities WHERE ${final[0]} = 1 OR ${final[1]} = 1 OR ${final[2]} = 1`, function(error, results){
                    console.log(results);
                });
            }else if (cnt == 4){
                db.query(`INSERT INTO ${user}filter SELECT * FROM activities WHERE ${final[0]} = 1 OR ${final[1]} = 1 OR ${final[2]} = 1 OR ${final[3]} = 1`, function(error, results){
                    console.log(results);
                });
            }else{
                db.query(`INSERT INTO ${user}filter SELECT * FROM activities WHERE ${final[0]} = 1 OR ${final[1]} = 1 OR ${final[2]} = 1 OR ${final[3]} = 1 OR ${final[4]} = 1`, function(error, results, fields){
                    console.log(results);
                });
            }

            //두번째 배너
            const walk = results[0].walk;
            feature[5] = "walk";
            label[5] = walk;

            const chronic = results[0].chronic;
            feature[6] = "chronic";
            label[6] = chronic;

            const breathe = results[0].breathe;
            feature[7] = "breathe";
            label[7] = breathe;

            const surprised = results[0].surprised;
            feature[8] = "surprised";
            label[8] = surprised;

            const people = results[0].people;
            feature[9] = "people";
            label[9] = people;

            const diet = results[0].diet;
            feature[10] = "diet";
            label[10] = diet;

            console.log("feature: "+feature);
            console.log("label: "+label);

            cnt = 0;
            const final2 = new Array(11);
            for (let i = 5; i < 11; i++) {
                if(label [i] == 1){
                    final2[cnt] = feature[i];
                    cnt = cnt+1;
                }
            }

            console.log("cnt pt2: "+cnt);

            if(cnt == 0){
                db.query(`SELECT name, description, type, location, platform, price FROM ${user}filter`, function(error, results, fields){
                    console.log(results);
                    res.send(JSON.parse(JSON.stringify(results)));
                });
            }else if(cnt == 1){
                db.query(`SELECT name, description, type, location, platform, price FROM ${user}filter WHERE ${final2[0]} = 1`, function(error, results, fields){
                    console.log(results);
                    res.send(JSON.parse(JSON.stringify(results)));
                });
            }else if (cnt == 2){
                db.query(`SELECT name, description, type, location, platform, price FROM ${user}filter WHERE ${final2[0]} = 1 OR ${final2[1]} = 1`, function(error, results, fields){
                    console.log(results);
                    res.send(JSON.parse(JSON.stringify(results)));
                });
            }else if (cnt == 3){
                db.query(`SELECT name, description, type, location, platform, price FROM ${user}filter WHERE ${final2[0]} = 1 OR ${final2[1]} = 1 OR ${final2[2]} = 1`, function(error, results, fields){
                    console.log(results);
                    res.send(JSON.parse(JSON.stringify(results)));
                });
            }else if (cnt == 4){
                db.query(`SELECT name, description, type, location, platform, price FROM ${user}filter WHERE ${final2[0]} = 1 OR ${final2[1]} = 1 OR ${final2[2]} = 1 OR ${final2[3]} = 1`, function(error, results, fields){
                    console.log(results);
                    res.send(JSON.parse(JSON.stringify(results)));
                });
            }else if (cnt == 5){
                db.query(`SELECT name, description, type, location, platform, price FROM ${user}filter WHERE ${final2[0]} = 1 OR ${final2[1]} = 1 OR ${final2[2]} = 1 OR ${final2[3]} = 1 OR ${final2[4]} = 1`, function(error, results, fields){
                    console.log(results);
                    res.send(JSON.parse(JSON.stringify(results)));
                });
            }else{
                db.query(`SELECT name, description, type, location, platform, price FROM ${user}filter WHERE ${final2[0]} = 1 OR ${final2[1]} = 1 OR ${final2[2]} = 1 OR ${final2[3]} = 1 OR ${final2[4]} = 1 OR ${final2[5]} = 1`, function(error, results, fields){
                    console.log(results);
                    res.send(JSON.parse(JSON.stringify(results)));
                });
            }
        });

    //데모용
        // const user = req.body.login_id;
        // db.query('SELECT * FROM user WHERE login_id =?', [user] , function(error, results, fields) {
        //     if (error) {
        //         console.log("message: cannot get info from SQL");
        //         throw error;
        //     }
        //     console.log(results);

        //     const learn = results[0].learn;
        //     const travel = results[0].travel;
        //     const art = results[0].art;
        //     const sports = results[0].sports;
        //     const foods = results[0].foods;

        //     const walk = results[0].learn;
        //     const chronic = results[0].chronic;
        //     const breathe = results[0].breathe;
        //     const surprised = results[0].surprised;
        //     const people = results[0].people;
        //     const diet = results[0].learn;

        //     db.query('SELECT t.name, t.description, t.type, t.location, t.platform, t.price FROM (SELECT * FROM activities WHERE activities.learn = ? OR activities.travel = ?) t where t.surprised =?', [learn, travel,diet,surprised] , function(error, results, fields) {
        //         console.log(JSON.parse(JSON.stringify(results)));
        //         console.log("success!!");
        //         res.send(JSON.parse(JSON.stringify(results)));
        //     });
        // });
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