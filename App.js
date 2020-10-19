const express = require('express');
const mysql = require('mysql');

// connecting server
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'migration'
});

db.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('connection stablished');
});

const app = express();

app.get('/getschool', (req, res) => {
    let sql = `SELECT * FROM school`;
    let query = db.query(sql, (err, results)=>{
        if (err) {
            throw err;
        }
        else{
            console.log(results);
            res.send('<div> result </div>'+ results[0]['id']);
        }
    });
});

app.get('/getschool/:id', (req, res) => {
    let sql = `SELECT * FROM school where id = ${req.params.id}`;
    let query = db.query(sql, (err, result)=>{
        if (err) {
            throw err;
        }
        else{
            console.log(result);
            res.send('<div> result </div>'+ result[0]['name']);
        }
    });
});


app.get('/gettables', (req, res) => {
    let sql = `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_SCHEMA='migration'`;
    let query = db.query(sql, (err, results)=>{
        if (err) {
            throw err;
        }
        else{
            res.send('<div> result </div>'+ results[0]['TABLE_NAME']);
        }
    });
});

app.get('/migrate', (req, res) => {
    let sql_tbnames = `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_SCHEMA='migration'`;
    let query = db.query(sql_tbnames, (err, results)=>{
        if (err) {
            throw err;
        }
        else{
            results.forEach((el) => {
                let sql_tb = `SELECT * FROM ${el['TABLE_NAME']}`;
                console.log(sql_tb);
                let query_tb = db.query(sql_tb, (err, results)=>{
                    if (err) {
                        throw err;
                    }
                    else{
                        console.log(results);
                    }
                });
            });
        }
    });

    res.send('<div> migrated </div>');

});


app.listen('3000', ()=>{
    console.log('Server has started');
});
