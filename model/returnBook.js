var db = require('./../database/database.js');

module.exports = {
  "getData": function(req, res, next) {
    var data = []
    db(function(err, connection){
      connection.query('SELECT * FROM ReturnBook', function(error, results){

        res.send(results)
        connection.release();

        if(error) throw error;
      })
    })
  },
  "currentEditBor": function(req, res, next){
    var borId = req.query.borId;
    var sql = 'SELECT * FROM ReturnBook WHERE returnId='+borId;
    db(function(err, connection){
      connection.query(sql, function(error, results){
        res.send(results)
        connection.release();
        if(error) throw error;
      })
    })
  },
  "addBor": function(req, res, next) {
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
        var sql = "INSERT INTO ReturnBook(returnId, bookId, time, personId, detail) VALUES(" +userId+","+"'"+userName+"'"+","+"'"+userPass+"'"+","+"'"+userType+"'"+","+"'"+userSex+"'"+ ")";
        console.log(sql)
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
  "searchBor": function(req, res, next) {
    var data = req.query
    var userId = data.userId;
    var userName = data.userName;
    var sort = data.userSort;
    db(function(err, connection) {

      var userIdSql = userId ? "bookId=" + "'" + userId + "'" : '';
      var userNameSql = userId ? (userName ? " and personId="+ "'" + userName + "' ": '') : (userName ? " personId="+ "'" + userName + "' ": '');
      var sortSql;
      if(userIdSql||userNameSql) {
        sortSql = "and time="+ "'" + sort + "'"
      }else{
        sortSql = "time="+"'" + sort + "'"
      }
      sortSql = sort ? sortSql : ''
      var sql = "SELECT *  FROM ReturnBook WHERE " + userIdSql + userNameSql + sortSql;
      console.log(sql)
      connection.query(sql, function(error, results) {
        res.send(results);
        connection.release();
        if(error) throw error;
      })

    })
  },
  "EditBor": function(req, res, next) {
    var data = req.body;
    var oldId = data.oldId;
    var EditBorId = data.EditBorId;
    var EditBorBookId = data.EditBorBookId;
    var EditBorTime = data.EditBorTime;
    var EditBorPerId= data.EditBorPerId;
    var EditBorDetail= data.EditBorDetail;
    db(function(err, connection) {
      var sql = "UPDATE ReturnBook SET returnId="+ EditBorId+","+"bookId="+EditBorBookId+","+"personId="+EditBorPerId+","+"time='"+EditBorTime.slice(0,9)+"'"+","+"detail='"+EditBorDetail+"'"+" WHERE returnId="+oldId;
      console.log(sql)
      connection.query(sql, function(error, results) {

        res.send({'resultCode': '000000'})

        connection.release();
        if(error) throw error;

      })
    })
  },
  "delBor": function(req, res, nex) {
    var userId = req.body.userId;
    db(function(err, connection) {
      var sql = "DELETE FROM ReturnBook WHERE returnId=" + userId;
      connection.query(sql, function(error, results) {
        res.send({'resultCode': '000000'})
        connection.release();
        if(error) throw error;
      })
    })
  }
}
