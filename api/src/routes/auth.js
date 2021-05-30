var express = require('express');
var router = express.Router();

const User = require('../models/user.js');

// POST route to register a user
router.post('/register', async(req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  user.save(function(err) {
    if (err) {
      res.status(500)
        .send("Error registering new user please try again.");
    } else {
      res.status(200).send("Welcome to the club!");
    }
  });
});

module.exports = router;
