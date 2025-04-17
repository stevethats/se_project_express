const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const {
  BAD_REQUEST,
  NOT_FOUND,
  DEFAULT,
  BAD_REQUEST_MESSAGE,
  NOT_FOUND_MESSAGE,
  DEFAULT_MESSAGE,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res.status(DEFAULT).send({ message: DEFAULT_MESSAGE });
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt.hash(password, 10).then((hash) =>
    User.create({
      name,
      avatar,
      email,
      password: hash,
    })
      .then((user) => {
        delete user.password;
        res.status(200).send({ data: user });
      })
      .catch((err) => {
        console.error(err);
        if (err.name === "ValidationError") {
          return res.status(BAD_REQUEST).send({ message: BAD_REQUEST_MESSAGE });
        }
        if (err.code === 11000) {
          return res
            .status(409)
            .send({ message: "User with this email already exists." });
        }
        return res.status(DEFAULT).send({ message: DEFAULT_MESSAGE });
      })
  );
};

const getCurrentUser = (req, res) => {
  const { _id } = req.user;

  User.findById(_id)
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: NOT_FOUND_MESSAGE });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: BAD_REQUEST_MESSAGE });
      }
      return res.status(DEFAULT).send({ message: DEFAULT_MESSAGE });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      console.log(err);
      res.status(BAD_REQUEST).send({ message: err.message });
    });
};

const updateProfile = (req, res) => {
  const { _id } = req.user;

  User.findByIdAndUpdate(
    _id,
    { name: User.name },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      console.log(err);
      res.send({
        message: "Data validation failed or another error has occcured",
      });
    });

  User.findByIdAndUpdate(
    _id,
    { avatar: User.avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      console.log(err);
      res.send({
        message: "Data validation failed or another error has occcured",
      });
    });
};

module.exports = { getUsers, createUser, getCurrentUser, login, updateProfile };
