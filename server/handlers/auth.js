const db = require("../models");

exports.register = async function (req, res, next) {
  try {
    const user = await db.User.create(req.body);
    const { id, username } = user;
    res.json({ username, id });
  } catch (error) {
    next(error);
  }
};

exports.login = async function (req, res, next) {
  try {
    const user = await db.User.findOne({ username: req.body.username });
    const { id, username } = user;
    const valid = await user.comparePassword(req.body.password);

    if (valid) {
      res.json({ username, id });
    } else {
      throw new Error("Invalid Username / Password");
    }
  } catch (error) {
    next(error);
  }
};
