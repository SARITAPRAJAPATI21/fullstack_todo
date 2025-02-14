require('dotenv').config({path:''});
const mysql =require('mysql2');


const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  });

  conn.connect(error => {
    if (error){
        console.log("A error has been occurred while connecting to database.");        
        throw error;
    }
    else{
        console.log("database connected ",process.env.DB_DATABASE)
    }
}
)

module.exports = conn;