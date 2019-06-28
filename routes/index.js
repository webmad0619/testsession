const express = require('express');
const router = express.Router();
const Book = require("../models/book")
const User = require("../models/user")

/* GET home page */
router.get('/book-add', (req, res, next) => {
  Book
    .create({ name: "test", year: 2018, author: "test author" })
    .then(createdBook => {
      res.json(createdBook)
    })
});

router.get('/book-update', (req, res, next) => {
  Book
    .findByIdAndUpdate("5d154135c894671a3a3693a7", { $rename: { "dani": "test" } }, { new: true })
    .then(createdBook => {
      res.json(createdBook)
    })
});

router.get("/login", (req, res, next) => {
  console.log("login")
  console.log(`req.session:`, req.session)
  res.render("login");
});

router.get("/logout", (req, res, next) => {
  console.log("logout")

  req.session.destroy(() => {
    // req.logout();
    req.session = null; 
    res.redirect('/login');
  });
});

router.get("/", (req, res, next) => {
  console.log(`req.session:`, req.session)
  res.render("index");
});

router.post("/login", (req, res, next) => {
  console.log(`req.session:`, req.session)

  const theUsername = req.body.username;
  const thePassword = req.body.password;

  if (theUsername === "" || thePassword === "") {
    res.render("login", {
      errorMessage: "Please enter both, username and password to sign up."
    });
    return;
  }

  User.findOne({ "username": theUsername })
    .then(user => {
      if (!user) {
        res.render("login", {
          errorMessage: "The username doesn't exist."
        });
        return;
      }
      if (thePassword === user.password) {
        // Save the login in the session!
        req.session.currentUser = user;
        res.redirect("/");
      } else {
        res.render("login", {
          errorMessage: "Incorrect password"
        });
      }
    })
    .catch(error => {
      next(error);
    })
});

module.exports = router;
