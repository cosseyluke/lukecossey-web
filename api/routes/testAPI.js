var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next) {
  res.send("v1.0.0 - API is working properly");
});

module.exports = router;
