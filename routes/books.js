var express = require('express');
var router = express.Router();
const Book = require('../models').Book;
const app = express();


/* GET books listing. */
router.get('/', function(req, res, next) {
  Book.findAll().then( (books) => {
    res.render('index.pug', { books: books, title: 'Books' });
  });
});

/* Add a new book form. */
router.get('/books/new', function(req, res, next) {
  res.render('new-book.pug', { title: 'Books' });
});

/* Post a new book to database. */
router.post('/books/new', function(req, res, next) {
  res.render('new-book.pug', { title: 'Books' });
});

/* Show book details form. */
router.get('/books/:id', function(req, res, next) {
  res.render('update-book.pug', { title: 'Books' });
});

/* Update book info in the database. */
router.post('/books/:id', function(req, res, next) {
  res.render('update-book.pug', { title: 'Books' });
});

/* Delete a book. */
router.post('/books/:id/delete', function(req, res, next) {
  res.render('update-book.pug', { title: 'Books' });
});


/* Function which handles non-existenet routes. */
// app.use((request, response, next) => {
//   const error = new Error('Page not found');
//   error.status = 404;
//   //next(error);
//   response.render('page-not-found.pug', {
//     error: error,
//     errorStatus: error.status
//   })
// })
//
// /*Error handler*/
// app.use((error, request, response, next) => {
//   response.locals.error = error;
//   response.status(error.status);
//   response.render('error.pug', {
//     error: error,
//     errorStatus: error.status
//   })
// })

module.exports = router;
