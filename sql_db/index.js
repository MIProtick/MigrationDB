const mysql = require('mysql');


// `Congigure Here Only`
var db = mysql.createConnection({
    host     : 'localhost', // Host address[:port->{if any}] I have used xampp server
    user     : 'root',      // Username
    password : '',          //password ->{if any}
    database : 'migration'  // database name which we will migrate
});


// Create connection
db.connect((error)=>{
    if(error){
        console.log("MySQL: Connection Failed.");
    }
    else{
        console.log("MySQL: Successfully Connected.");
    }
});

module.exports = db;
