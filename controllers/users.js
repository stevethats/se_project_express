const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { BadRequestError } = require("../utils/errors/bad-request");
const { UnauthorizedError } = require("../utils/errors/unauthorized");
const { NotFoundError } = require("../utils/errors/not-found");
const { ConflictError } = require("../utils/errors/conflict");
const { JWT_SECRET } = require("../utils/config");

const createUser = (req, res, next) => {
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
          next(new BadRequestError("Request to the server failed."));
        } else if (err.code === 11000) {
          next(new ConflictError("User with this email already exists."));
        } else {
          next(err);
        }
      })
  );
};

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .orFail()
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("User not found."));
      } else if (err.name === "CastError") {
        next(new BadRequestError("Request to the server failed."));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(new BadRequestError("Request to the server failed."));
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
        next(new UnauthorizedError("Incorrect email or password"));
      } else {
        next(err);
      }
    });
};

const updateProfile = (req, res, next) => {
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
        next(new BadRequestError("Request to the server failed."));
      } else {
        next(err);
      }
    });
};

module.exports = { createUser, getCurrentUser, login, updateProfile };
