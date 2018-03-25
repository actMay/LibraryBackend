var db = require('./../database/database.js');

module.exports = {
  "getBookData": function(req, res, next) {
    db(function(err, connection){
      connection.query('SELECT * FROM Book', function (error, results) {
        res.send(results)
        connection.release();

        if (error) throw error;
      });
    })
  },
  "currentEditBook": function(req, res, next){
    var bookId = req.query.bookId;
    var sql = 'SELECT * FROM Book WHERE bookId='+bookId;
    db(function(err, connection){
      connection.query(sql, function(error, results){
        res.send(results);
        connection.release();
        if(error) throw error;
      })
    })
  },
  "addBook": function(req, res, next) {
    var data = req.body;
    var bookId = data.bookId;
    var bookName = data.bookName;
    var bookSort= data.bookSort;
    var author= data.author;
    var isLend = data.isLend;
    var location= data.location;
    console.log(data)
    db(function(err, connection) {
      console.log(bookId,bookName,bookSort,author, isLend,location);
      // if(!Number(bookId)) {
      //   console.log(0)
      //   res.send({'resultCode': '111111'})
      // } else {
      //   console.log(1)
        var sql = "INSERT INTO Book(bookId, bookName, sort, author, isLend, location) VALUES(" +Number(bookId)+","+"'"+bookName+"'"+","+"'"+bookSort+"'"+","+"'"+author+"'"+","+"'"+Number(isLend)+"'"+","+"'"+location+"'" + ")";
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
      // }
    })
  },
  "searchBook": function(req, res, next) {
    var data = req.query;
    var bookId = data.bookId;
    var bookName = data.bookName;
    var sort = data.sort;
    var author = data.author;
    console.log(data)
    db(function(err, connection) {
      var bookIdSql = bookId ? "bookId=" + "'" + bookId + "'" : '';
      var bookNameSql = bookId ? (bookName ? " and bookName="+ "'" + bookName + "' ": '') : (bookName ? " bookName="+ "'" + bookName + "' ": '');
      var sortSql;
      var authorSql;
      if(bookIdSql||bookNameSql) {
        sortSql = "and sort="+ "'" + sort + "'"
      }else{
        sortSql = "sort="+"'" + sort + "'"
      }
      sortSql = sort ? sortSql : '';
      if(bookIdSql||bookNameSql||sortSql) {
        authorSql = "and author="+ "'" + author + "'";
      }else{
        authorSql = "author="+ "'" + author + "'";
      }
      authorSql = author ? authorSql : '';
      var sql = "SELECT *  FROM Book WHERE " + bookIdSql + bookNameSql + sortSql + authorSql;
      console.log(sql)
      connection.query(sql, function(error, results) {
        res.send(results);
        connection.release();
        if(error) throw error;
      })

    })
  },
  "EditBook": function(req, res, next) {
    var data = req.body;
    var oldId = data.oldId;
    var bookId = data.bookId;
    var bookName = data.bookName;
    var sort= data.sort;
    var author= data.author;
    var isLend = data.isLend;
    var location= data.location;
    db(function(err, connection) {
      var sql = "UPDATE Book SET bookId="+ bookId+","+"bookName='"+bookName+"'"+","+"sort='"+sort+"'"+","+"author='"+author+"'"+","+"isLend='"+isLend+"'"+","+"location='"+location+"'"+ " WHERE bookId="+oldId;
      connection.query(sql, function(error, results) {

        res.send({'resultCode': '000000'})

        connection.release();
        if(error) throw error;

      })
    })
  },
  "delBook": function(req, res, nex) {
    var bookId = req.body.bookId;
    db(function(err, connection) {
      var sql = "DELETE FROM Book WHERE bookId=" + bookId;
      connection.query(sql, function(error, results) {
        res.send({'resultCode': '000000'})
        connection.release();
        if(error) throw error;
      })
    })
  }
}
