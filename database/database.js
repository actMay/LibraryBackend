var mysql = require('mysql');

var db = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'library'
})

var connection = function(callback){
  db.getConnection(callback)
}

module.exports = connection;
