var express = require('express');
var router = express.Router();
const { parseQueryFilter, parseQuerySort } = require('./utils');

const withAuth = require('../middleware');

const {User} = require('../models/users.js');

/**
 * GET user listings
 */
router.get('/', withAuth, async(req, res) => {
  const ALLOWED_FILTER = {'id': '_id', 'email': 'email'};
  const ALLOWED_SORT = ['email', 'first_name', 'last_name', 'created'];
  const query = req.query;

  const filter = parseQueryFilter(query, ALLOWED_FILTER);
  const sort = parseQuerySort(query, ALLOWED_SORT);

  try {
    const users = await User.find(filter).sort(sort);
    res.header('X-Total-Count', users.length);
    res.json(users);
  } catch (err) {
    res.status(500).json({message: err.message })
  }
});

/**
 * POST create user
 */
router.post('/', withAuth, async(req, res) => {
  const body = {
    email: req.body.email,
    password: req.body.password
  }

  if (req.body.first_name !== undefined) body.first_name = req.body.first_name
  if (req.body.last_name !== undefined) body.last_name = req.body.last_name

  const user = new User(body);

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/**
 * GET user
 *
 * @param {String} id id of the user object
 */
router.get('/:id', withAuth, async(req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({message: err.message })
  }
});

/**
 * PUT update user
 */
router.put('/:id', withAuth, async (req, res) => {
  try {
    const body = {
      'email': req.body.email,
      'first_name': req.body.first_name,
      'last_name': req.body.last_name
    }
    const newPassword = req.body.new_password !== undefined ? req.body.new_password : null;

    const user = await User.findByIdAndUpdate(req.params.id, body, function(err, user) {
      if (err) {
        res.status(500).send(err);
      } else {
        if (newPassword !== null) {
          user.password = newPassword;
          user.save(function (err, user) {
            if (err) {
              throw Error(err)
            }
          });
        }
      }
    });

    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    res.status(500).send(err);
  }
})


module.exports = router;
