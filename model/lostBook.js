var db = require('./../database/database.js');

module.exports = {
  "getData": function(req, res, next) {
    db(function(err, connection){
      connection.query('SELECT * FROM LostBook', function (error, results) {
        res.send(results)
        connection.release();

        if (error) throw error;
      });
    })
  },
  "currentEditUser": function(req, res, next){
    var userId = req.query.userId;
    var sql = 'SELECT * FROM LostBook WHERE lostId='+userId;
    console.log(sql)
    db(function(err, connection){
      connection.query(sql, function(error, results){
        res.send(results);
        connection.release();
        if(error) throw error;
      })
    })
  },
  "addUser": function(req, res, next) {
    var data = req.body;
    var userId = data.userId;
    var userName = data.userName;
    var userPass= data.userPass;
    var userType= data.userType;
    var userSex = data.userSex;
    db(function(err, connection) {
      if(!Number(userId)) {
        res.send({'resultCode': '111111'})
      } else {
        var sql = "INSERT INTO LostBook(lostId, bookName, bookId, lostTime, lostReason) VALUES(" +userId+","+"'"+userName+"'"+","+"'"+userPass+"'"+","+"'"+userType+"'"+","+"'"+userSex + "'" + ")";
        console.log(sql);
        connection.query(sql, function(error, results) {
          if(results) {
            res.send({'resultCode': '000000'})
          }else {
            res.send({'resultCode': '111111'})
          }
          connection.release();
          if(error) throw error;
        })
      }
    })
  },
  "searchUser": function(req, res, next) {
    var data = req.query
    var userId = data.lostId;
    var userName = data.bookId;
    var sort = data.bookName;
    db(function(err, connection) { 

      var userIdSql = userId ? "lostId=" + "'" + userId + "'" : '';
      var userNameSql = userId ? (userName ? " and bookId="+ "'" + userName + "' ": '') : (userName ? " bookId="+ "'" + userName + "' ": '');
      var sortSql;
      if(userIdSql||userNameSql) {
        sortSql = "and bookName="+ "'" + sort + "'"
      }else{
        sortSql = "bookName="+"'" + sort + "'"
      }
      sortSql = sort ? sortSql : ''
      var sql = "SELECT *  FROM LostBook WHERE " + userIdSql + userNameSql + sortSql;
      console.log(sql)
      connection.query(sql, function(error, results) {
        res.send(results);
        connection.release();
        if(error) throw error;
      })

    })
  },
  "EditUser": function(req, res, next) {
    var data = req.body;
    var oldId = data.oldId;
    var userId = data.userId;
    var userName = data.userName;
    var userPass= data.userPass;
    var userType= data.userType;
    var userSex = data.userSex;
    console.log(data)
    db(function(err, connection) {
      var sql = "UPDATE LostBook SET lostId="+ userId+","+"bookId='"+userName+"'"+","+"bookName='"+userPass+"'"+","+"lostTime='"+userType.slice(0,9)+"'"+","+"lostReason='"+userSex+"'"+ " WHERE lostId="+oldId;
      console.log(sql)
      connection.query(sql, function(error, results) {

        res.send({'resultCode': '000000'})

        connection.release();
        if(error) throw error;

      })
    })
  },
  "delUser": function(req, res, nex) {
    var userId = req.body.userId;
    db(function(err, connection) {
      var sql = "DELETE FROM LostBook WHERE lostId=" + userId;
      connection.query(sql, function(error, results) {
        res.send({'resultCode': '000000'})
        connection.release();
        if(error) throw error;
      })
    })
  }
}
