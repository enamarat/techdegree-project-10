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
router.get('/details/:id', function(req, res, next) {
  Book.findByPk(req.params.id).then((book) => {
    res.render('update-book.pug', { book: book, pageTitle: 'Book details'});
  });
});

/* Update book info in the database. */
router.put('/details/:id', function(req, res, next) {
  Book.findByPk(req.params.id).then((book) => {
    return book.update(req.body);
  }).then((book)=> {
    res.redirect("/books");
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
  });
});

/* Delete a book. */
router.post('/details/:id/delete', function(req, res, next) {
  Book.findByPk(req.params.id).then((book)=>{
    return book.destroy();
  }).then(() => {
    res.redirect("/books");
  });
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
