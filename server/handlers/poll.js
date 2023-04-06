const { Error } = require("mongoose");
const db = require("../models");

exports.showPolls = async (req, res, next) => {
  try {
    const polls = await db.Poll.find();
    res.status(200).json(polls);
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

exports.usersPolls = async (req, res, next) => {
  try {
    const { id } = req.decoded;

    const user = await db.User.findById(id).populate("polls");
    res.status(200).json(user.polls);
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

exports.createPoll = async (req, res, next) => {
  try {
    console.log(req.decoded);
    const { id } = req.decoded;
    const user = await db.User.findById(id);
    const { question, options } = req.body;
    const poll = await db.Poll.create({
      user,
      question,
      options: options.map((option) => ({
        option,
        votes: 0,
      })),
    });
    user.polls.push(poll._id);
    await user.save();
    res.status(201).json({ ...poll._doc, user: user._id });
  } catch (error) {
    error.status = 400;
    next(error);
  }
};



exports.vote = async (req, res, next) => {
    const { id: pollId } = req.params;
    const { id: userId } = req.decoded;
    const { answer } = req.body;
    try {
      if (answer) {
        const poll = await db.Poll.findById(pollId);
        if (!poll) throw new Error('No poll found');
  
        const vote = poll.options.map(
          option =>
            option.option === answer
              ? {
                  option: option.option,
                  _id: option._id,
                  votes: option.votes + 1,
                }
              : option,
        );
  
        console.log('VOTE: USERID ', userId);
        console.log('VOTE: poll.voted ', poll.voted);
        console.log(
          'VOTE: vote filter',
          poll.voted.filter(user => user.toString() === userId).length,
        );
  
        if (poll.voted.filter(user => user.toString() === userId).length <= 0) {
          poll.voted.push(userId);
          poll.options = vote;
          await poll.save();
  
          return res.status(202).json(poll);
        } else {
          throw new Error('Already voted');
        }
      } else {
        throw new Error('No Answer Provided');
      }
    } catch (err) {
      return next({
        status: 400,
        message: err.message,
      });
    }
  };

exports.getPoll = async (req, res, next) => {
  try {
    const { id } = req.params;
    const poll = await db.Poll.findById(id).populate("user", [
      "username",
      "id",
    ]);
    if (!poll) throw new Error("No poll found");
    res.status(200).json(poll);
  } catch (error) {
    error.status = 400;
    next(error);
  }
};

exports.deletePoll = async (req, res, next) => {
  try {
    const { id: pollId } = req.params;
    const { id: userId } = req.decoded;

    const poll = await db.Poll.findById(pollId);
    if (!poll) throw new Error("No Poll Found");
    if (poll.user.toString() !== userId) {
      throw new Error("Unauthorized access");
    }
    await poll.deleteOne();
    res.status(202).json(poll);
  } catch (error) {
    error.status = 400;
    next(error);
  }
};