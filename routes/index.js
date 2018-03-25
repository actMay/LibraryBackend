var express = require('express');
var router = express.Router();
var db = require('./../database/database.js');
var User = require('./../model/user.js');
var Book = require('./../model/book.js');
var System = require('./../model/system.js');
var BorBook = require('./../model/borBook.js');
var ReturnBook = require('./../model/returnBook.js');
var LostBook = require('./../model/lostBook.js');

router.get('/userInfo', User.getData)
router.get('/userInfo/EditCurrentUserInfo', User.currentEditUser)
router.get('/userInfo/searchUser', User.searchUser)
router.post('/userInfo/addUser', User.addUser)
router.post('/userInfo/EditUser', User.EditUser)
router.post('/userInfo/delUser', User.delUser)

router.get('/bookInfo', Book.getBookData)
router.get('/bookInfo/EditCurrentBookInfo', Book.currentEditBook)
router.get('/bookInfo/searchBook', Book.searchBook)
router.post('/bookInfo/addBook', Book.addBook)
router.post('/bookInfo/EditBook', Book.EditBook)
router.post('/bookInfo/delBook', Book.delBook)

router.get('/system/getData', System.getData)
router.post('/system/setTeacher', System.setTeacher);
router.post('/system/setStu', System.setStu);

router.get('/borBook', BorBook.getData)
router.get('/borBook/EditCurrentBorInfo', BorBook.currentEditBor)
router.get('/borBook/searchBor', BorBook.searchBor)
router.post('/borBook/addBor', BorBook.addBor)
router.post('/borBook/EditBor', BorBook.EditBor)
router.post('/borBook/delBor', BorBook.delBor)

router.get('/returnBook', ReturnBook.getData)
router.get('/returnBook/EditCurrentBorInfo', ReturnBook.currentEditBor)
router.get('/returnBook/searchBor',ReturnBook.EditBor)
router.post('/returnBook/addBor', ReturnBook.addBor)
router.post('/returnBook/EditBor', ReturnBook.EditBor)
router.post('/returnBook/delBor', ReturnBook.delBor)

router.get('/lostBook', LostBook.getData)
router.get('/lostBook/EditCurrentLostBook', LostBook.currentEditUser)
router.get('/lostBook/searchLostBook', LostBook.searchUser)
router.post('/lostBook/addLostBook', LostBook.addUser)
router.post('/lostBook/EditLostBook', LostBook.EditUser)
router.post('/lostBook/delLostBook', LostBook.delUser)

module.exports = router;
