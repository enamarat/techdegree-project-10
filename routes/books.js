var express = require('express');
var router = express.Router();
const Book = require('../models').Book;
const app = express();

/* GET books listing. */
router.get('/', function(req, res, next) {
  Book.findAll().then((books) => {
    res.render('index.pug', { books: books, pageTitle: 'Books'});
  });
});

/* Show book details form. */
router.get('/book:id', function(req, res, next) {
  Book.findByPk(req.params.id).then((book) => {
    // If a user types wrong id, an error message will appear.
    if (book) {
      res.render('update-book.pug', { book: book, pageTitle: 'Book details'});
    } else {
      res.render('error.pug', { message: 'Server Error', description: 'Sorry! There was an unexpected error on the server.'});
    }
  });
});

/* Update book info in the database. */
router.post('/book:id', function(req, res, next) {
  Book.findByPk(req.params.id).then((book) => {
    return book.update(req.body);
  }).then((book)=> {
    res.redirect("/books");
  }).catch((err)=> {
    if (err.name === "SequelizeValidationError") {
      const book = Book.build(req.body);
      book.id = req.params.id;
      res.render('update-book.pug', {book: book, pageTitle: "Book details", errors: err.errors});
    } else {
      throw err;
    }
  });
});

/* Add a new book form. */
router.get('/new', function(req, res, next) {
  res.render('new-book.pug', { pageTitle: 'New Book' });
});

/* Post a new book to database. */
router.post('/new', function(req, res, next) {
  return Book.create(req.body).then(() => {
    res.redirect("/books");
  }).catch((err)=> {
    if (err.name === "SequelizeValidationError") {
      res.render('new-book.pug', {book: Book.build(req.body), pageTitle: "New book", errors: err.errors});
    } else {
      throw err;
    }
  });
});

/* Delete a book. */
router.post('/book:id/delete', function(req, res, next) {
  Book.findByPk(req.params.id).then((book)=>{
    return book.destroy();
  }).then(() => {
    res.redirect("/books");
  });
});

module.exports = router;
