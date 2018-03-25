var db = require('./../database/database.js');

module.exports = {
  "getData": function(req, res, next) {
    db(function(err, connection){
      connection.query('SELECT * FROM System', function (error, results) {
        res.send(results)
        connection.release();

        if (error) throw error;
      });
    })
  },
  "setTeacher": function(req, res, next) {
    var data = req.body;
    var teacherMaxTime = data.teacherMaxTime;
    var teacherMaxNum = data.teacherMaxNum;
    var teacherFine = data.teacherFine;
    db(function(err, connection) {
      var sql = "UPDATE System SET teacherMaxTime="+ teacherMaxTime+"," + "teacherMaxNum="+teacherMaxNum+","+"teacherFine="+teacherFine;
      connection.query(sql, function(error, results) {

        res.send({'resultCode': '000000'})

        connection.release();
        if(error) throw error;

      })
    })
  },
  "setStu": function(req, res, next) {
    var data = req.body;
    var stuMaxTime = data.stuMaxTime;
    var stuMaxNum = data.stuMaxNum;
    var stuFine = data.stuFine;
    db(function(err, connection) {
      var sql = "UPDATE System SET stuMaxTime="+ stuMaxTime+"," + "stuMaxNum="+stuMaxNum+","+"stuFine="+stuFine;
      console.log(sql)
      connection.query(sql, function(error, results) {

        res.send({'resultCode': '000000'})

        connection.release();
        if(error) throw error;

      })
    })
  }
}
