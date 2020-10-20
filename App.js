const mysql = require('mysql');

// connecting server mysql 
const sql_db = require('./sql_db'); 

// connecting server mongo
const mongo_db = require('./models');



// Main Migration
console.log('\n\n\n----------------------Start Migrating------------');
let sql_tbnames = `SHOW TABLES`;
let query = sql_db.query(sql_tbnames, (err, results)=>{
    if (err) {
        throw err;
    }
    else{
        console.log('\n\t>> MySQL: got tables');
        console.log(results);
        results.forEach((el) => {

            let temp_table = el['Tables_in_migration'];
            let sql_tb = `SELECT * FROM ${el['Tables_in_migration']}`;    
            let query_tb = sql_db.query(sql_tb, (err, results)=>{
                if (err) {
                    throw err;
                }
                else{
                    console.log('\n\t>> MySQL: Fetched Sql data from table: '+ temp_table);
                    let collection = mongo_db.collection(temp_table);
                    console.log('\t>> MongoDB: Created collection: '+ temp_table);
                    console.log('\t>> MongoDB: Inserting: ');
                    console.log(JSON.parse(JSON.stringify(results)));
                    collection.insertMany(JSON.parse(JSON.stringify(results)), function(err, result){
                        if (!err) {
                            console.log('\t>> MongoDB: Insertion Completed');
                            console.log('\n');
                        } else {
                            console.log("\t>> MongoDB: Insertion failed.");
                            console.log('\n');
                        }
                    });
                }
            });
        });
    }
});



