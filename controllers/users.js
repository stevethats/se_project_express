const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { ERROR_CODES } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

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
        delete User.password;
        res
          .status(200)
          .send({ name: user.name, avatar: user.avatar, email: user.email });
      })
      .catch((err) => {
        console.error(err);
        if (err.name === "ValidationError") {
          return res
            .status(ERROR_CODES.BAD_REQUEST)
            .send({ message: ERROR_CODES.BAD_REQUEST_MESSAGE });
        }
        if (err.code === 11000) {
          return res
            .status(ERROR_CODES.CONFLICT_ERROR)
            .send({ message: ERROR_CODES.CONFLICT_ERROR_MESSAGE });
        }
        return res
          .status(ERROR_CODES.SERVER_ERROR)
          .send({ message: ERROR_CODES.SERVER_ERROR_MESSAGE });
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
        return res
          .status(ERROR_CODES.NOT_FOUND)
          .send({ message: ERROR_CODES.NOT_FOUND_MESSAGE });
      }
      if (err.name === "CastError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST)
          .send({ message: ERROR_CODES.BAD_REQUEST_MESSAGE });
      }
      return res
        .status(ERROR_CODES.SERVER_ERROR)
        .send({ message: ERROR_CODES.SERVER_ERROR_MESSAGE });
    });
};

const login = (req, res) => {
  s;
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(ERROR_CODES.BAD_REQUEST)
      .send({ message: ERROR_CODES.BAD_REQUEST_MESSAGE });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.status(200).send({ token });
    })
    .catch((err) => {
      console.log(err);
      if (err.message === "Incorrect email or password") {
        return res
          .status(ERROR_CODES.UNAUTH_ERROR)
          .send({ message: ERROR_CODES.UNAUTH_ERROR_MESSAGE });
      }
      return res
        .status(ERROR_CODES.SERVER_ERROR)
        .send({ message: ERROR_CODES.SERVER_ERROR_MESSAGE });
    });
};

const updateProfile = (req, res) => {
  const { _id } = req.user;
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    _id,
    { name, avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .then((user) => {
      res.status(200).send({ data: user });
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidationError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST)
          .send({ message: ERROR_CODES.BAD_REQUEST_MESSAGE });
      }
      return res
        .status(ERROR_CODES.SERVER_ERROR)
        .send({ message: ERROR_CODES.SERVER_ERROR_MESSAGE });
    });
};

module.exports = { createUser, getCurrentUser, login, updateProfile };
