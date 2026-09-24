const User = require("../models/user");
const HttpError = require("../models/http-error");
const bcrypt = require("bcryptjs");

const { validationResult } = require("express-validator");

async function getUsers(req, res, next) {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    return next(new HttpError("Error fetching Users!", 500));
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
}

async function signup(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  const { name, email, password } = req.body;

  let hasUser;

  try {
    hasUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Signup failed.Try Again!", 500));
  }

  if (hasUser) {
    throw new HttpError("User with this email already exists!", 422);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (err) {
    const error = new HttpError("Signing Up failed. Please try again!", 500);
    return next(error);
  }

  const newUser = new User({
    name,
    email,
    image: req.file.path,
    password: hashedPassword,
    places: [],
  });

  try {
    await newUser.save();
  } catch (err) {
    const error = new HttpError("Signing Up failed. Please try again!", 500);
    return next(error);
  }

  res.status(201).json({ user: newUser.toObject({ getters: true }) });
}

async function login(req, res, next) {
  const { email, password } = req.body;

  let registeredUser;
  try {
    registeredUser = await User.findOne({ email: email });
  } catch (err) {
    console.log(err);
    return next(new HttpError("Logging In failed.Try Again!", 500));
  }

  if (!registeredUser) {
    throw new HttpError(
      "Could not identify user, credentials seem to be wrong",
      401,
    );
  }
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, registeredUser.password);
  } catch (err) {
    const error = new HttpError("Logging In failed.Please try again!", 500);
    return next(error);
  }

  if (!isValidPassword) {
    next(
      new HttpError(
        "Could not identify user, credentials seem to be wrong",
        401,
      ),
    );
  }

  res.json({
    message: "Successfully Logged In!",
    user: registeredUser.toObject({ getters: true }),
  });
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
