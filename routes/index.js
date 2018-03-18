var express = require('express');
var router = express.Router();
var db = require('./../database/database.js');


router.get('/userInfo', function(req, res, next) {
  db(function(err, connection){
    connection.query('SELECT * FROM User', function (error, results) {
      res.send(results)
      connection.release();

      if (error) throw error;
    });
  })
})

router.get('/userInfo/EditCurrentUserInfo', function(req, res, next){
  var userId = req.query.userId;
  var sql = 'SELECT * FROM User WHERE userId='+userId;
  db(function(err, connection){
    connection.query(sql, function(error, results){
      res.send(results);
      connection.release();
      if(error) throw error;
    })
  })
})

router.post('/userInfo/addUser', function(req, res, next) {
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
})

router.get('/userInfo/searchUser', function(req, res, next) {
  var data = req.query
  var userId = data.userId;
  var userName = data.userName;
  var sort = data.userSort;
  db(function(err, connection) {
    if(!userId) {
      res.send({'resultCode':'111111'})
    }else{
      var userIdSql = userId ? "userId=" + "'" + userId + "'" : '';
      var userNameSql = userId ? (userName ? " and userName="+ "'" + userName + "' ": '') : (userName ? " userName="+ "'" + userName + "' ": '');
      var sortSql = sort ? "and isTeacher="+ "'" + sort + "'": '';
      if(sortSql) {
        sortSql = "and isTeacher="+ "'" + sort + "'"
      }else if(userIdSql) {
        sortSql = "isTeacher="+"'" + sort + "'"
      }
      var sql = "SELECT *  FROM User WHERE " + userIdSql + userNameSql + sortSql;
      connection.query(sql, function(error, results) {
        res.send(results);
        connection.release();
        if(error) throw error;
      })
    }
  })
})

router.post('/userInfo/EditUser', function(req, res, next) {
  var data = req.body;
  var oldId = data.oldId;
  var userId = data.userId;
  var userName = data.userName;
  var userPass= data.userPass;
  var userType= data.userType;
  var userSex = data.userSex;
  var userCollege= data.userCollege;
  var userDepart= data.userDepart;
  console.log(data)
  db(function(err, connection) {
    var sql = "UPDATE User SET userId="+ userId+","+"userName='"+userName+"'"+","+"password='"+userPass+"'"+","+"isTeacher='"+userType+"'"+","+"sex='"+userSex+"'"+","+"college='"+userCollege+"'"+","+"department='"+userDepart+"'"+ " WHERE userId="+oldId;
    connection.query(sql, function(error, results) {
      
      res.send({'resultCode': '000000'})

      connection.release();
      if(error) throw error;

    })
  })
})

router.post('/userInfo/delUser', function(req, res, nex) {
  var userId = req.body.userId;
  db(function(err, connection) {
    var sql = "DELETE FROM User WHERE userId=" + userId;
    connection.query(sql, function(error, results) {
      res.send({'resultCode': '000000'})
      connection.release();
      if(error) throw error;
    })
  })
})

module.exports = router;
