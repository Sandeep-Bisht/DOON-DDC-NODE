const mysql = require('mysql');
require('dotenv').config()

// create MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
    database: 'doon_ddc'
  //database: 'digestive_care'                //local MSQL
});

     // connect to MySQL

     db.connect((err) => {
      if (err) {
        console.log('Error connecting to MySQL database:', err);
      } else {
        console.log('Connected to MySQL database.');
      }
    });
    
module.exports = db;

