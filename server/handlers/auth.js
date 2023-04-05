const jwt = require('jsonwebtoken')
const db = require("../models");


exports.register = async function (req, res, next) {
  try {
    const user = await db.User.create(req.body);
    const { id, username } = user;

    const token = jwt.sign({id, username}, process.env.SECRET)

    res.status(201).json({ username, id, token });
  } catch (error) {
    if(error.code === 11000) {
      error.message = "Sorry this User already exists"
    }
    next(error);
  }
};

exports.login = async function (req, res, next) {
  try {
    const user = await db.User.findOne({ username: req.body.username });
    const { id, username } = user;
    const valid = await user.comparePassword(req.body.password);

    if (valid) {
      const token = jwt.sign({id, username}, process.env.SECRET)
      res.json({ username, id });
    } else {
      throw new Error();
    }
  } catch (error) {
    error.message = "Invalid Username / Password"
    next(error);
  }
};
