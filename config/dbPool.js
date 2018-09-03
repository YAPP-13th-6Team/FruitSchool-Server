const mysql = require('mysql');
const dbConfig = {
  host : 'fruit.czhtgtb3narm.ap-northeast-2.rds.amazonaws.com',
  port : 3306,
  user : 'fruit_dba',
  password : 'fruit123',
  database : 'fruitdb'
}

module.exports = mysql.createPool(dbConfig);
