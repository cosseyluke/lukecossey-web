const jwt = require('jsonwebtoken');

const withAuth = function(req, res, next) {
  const token =
      req.body.token ||
      req.query.token ||
      req.headers['x-access-token'] ||
      req.cookies.token;

  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
}

module.exports.withAuth = withAuth;

const REMOVE_HEADERS = ['X-Powered-By'];

const removeCorsHeaders = function(req, res, next) {
  REMOVE_HEADERS.forEach((name) => {
    res.removeHeader(name);
  });

  next();
}

module.exports.removeCorsHeaders = removeCorsHeaders;
