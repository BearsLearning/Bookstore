const mysql = require('mysql2');

const connection = mysql.createConnection(.{
    host:"localhost",
    user:"root",
    password:"password",
    database:"books"
});

connection.connect((err)=>{i
    f(err){
        console.log(err);
        return;
    }
    console.log("MySQL Connected");
});

module.exports = connection;