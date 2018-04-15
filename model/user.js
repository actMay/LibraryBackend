var db = require('./../database/database.js');

module.exports = {
  "getData": function(req, res, next) {
    db(function(err, connection){
      connection.query('SELECT * FROM User', function (error, results) {
        res.send(results)
        connection.release();

        if (error) throw error;
      });
    })
  },
  "currentEditUser": function(req, res, next){
    var userId = req.query.userId;
    var sql = 'SELECT * FROM User WHERE userId='+userId;
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
    var userCollege= data.userCollege;
    var userDepart= data.userDepart;
    db(function(err, connection) {
      if(!Number(userId)) {
        res.send({'resultCode': '111111'})
      } else {
        var sql = "INSERT INTO User(userId, userName, password, isTeacher, sex, college, department) VALUES(" +userId+","+"'"+userName+"'"+","+"'"+userPass+"'"+","+"'"+userType+"'"+","+"'"+userSex+"'"+","+"'"+userCollege+"'"+","+"'"+userDepart +"'" + ")";
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
    var userId = data.userId;
    var userName = data.userName;
    var sort = data.userSort;
    db(function(err, connection) {

      var userIdSql = userId ? "userId=" + "'" + userId + "'" : '';
      var userNameSql = userId ? (userName ? " and userName like"+ "'%" + userName + "%' ": '') : (userName ? " userName like"+ "'%" + userName + "%' ": '');
      var sortSql;
      if(userIdSql||userNameSql) {
        sortSql = "and isTeacher="+ "'" + sort + "'"
      }else{
        sortSql = "isTeacher="+"'" + sort + "'"
      }
      sortSql = sort ? sortSql : '';
      if(!(userIdSql||userNameSql||sortSql)) {
        var sql = "SELECT *  FROM User";
      }else{

        var sql = "SELECT *  FROM User WHERE " + userIdSql + userNameSql + sortSql;
      }
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
    var userCollege= data.userCollege;
    var userDepart= data.userDepart;
    // var img = data.img;
    console.log(req.file, req.body)
    db(function(err, connection) {
      var sql = "UPDATE User SET userId="+ userId+","+"userName='"+userName+"'"+","+"password='"+userPass+"'"+","
      +"isTeacher='"+userType+"'"+","+"sex='"+userSex+"'"+","+"college='"+userCollege+"'"+","+"pic='"+req.file.filename+"',"
      +"department='"+userDepart+"'"+ " WHERE userId="+oldId;
      connection.query(sql, function(error, results) {

        res.send({'resultCode': '000000', 'filename': req.file.filename})

        connection.release();
        if(error) throw error;

      })
    })
  },
  "delUser": function(req, res, nex) {
    var userId = req.body.userId;
    db(function(err, connection) {
      var sql = "DELETE FROM User WHERE userId=" + userId;
      connection.query(sql, function(error, results) {
        res.send({'resultCode': '000000'})
        connection.release();
        if(error) throw error;
      })
    })
  }
}
