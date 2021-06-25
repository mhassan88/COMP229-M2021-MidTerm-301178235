/**File Name: server.js
 * Author Name: Muhammad Hassan
 * Student ID: 301178235
 * Favourite Books App
 */

// modules required for routing
import express from "express";
const router = express.Router();
export default router;

// define the book model
import book from "../Models/books";

/* GET books List page. READ */
router.get("/", (req, res, next) => {
  // find all books in the books collection
  book.find((err, books) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("books/index", {
        title: "Books",
        page: "books",
        books: books,
      });
    }
  });
});

//  GET the Book Details page in order to add a new Book
router.get("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  res.render("books/details", {
    title: "Add a Book",
    page: "details",
    books: new book(),
  });
});

// POST process the Book Details page and create a new Book - CREATE
router.post("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let newBook = new book({
    Title: req.body.title,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre,
  });
  book.create(newBook, (err) => {
    if (err) {
      console.log(err);
      return res.end(err);
    }
    res.redirect("/books");
  });
});

// GET the Book Details page in order to edit an existing Book
router.get("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  book.findById({ _id: req.params.id }, {}, {}, (err, book) => {
    if (err) {
      console.error(err);
      res.end(err);
    }
    res.render("books/details", {
      title: "Edit a Book",
      page: "details",
      books: book,
    });
  });
});

// POST - process the information passed from the details form and update the document
router.post("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id;
  let updatedBook = new book({
    _id: id,
    Title: req.body.title,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre,
  });
  book.updateOne({ _id: id }, updatedBook, {}, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    res.redirect("/books");
  });
});

// GET - process the delete by user id
router.get("/delete/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let id = req.params.id;
  book.deleteOne({ _id: id }, {}, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    }
    res.redirect("/books");
  });
});

//module.exports = router;
