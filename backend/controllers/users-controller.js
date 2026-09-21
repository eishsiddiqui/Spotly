const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

async function getUsers(req, res, next) {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    return next(new HttpError("Error fetching Users!", 500));
  }

  res.json({ users });
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

  const newUser = new User({
    name,
    email,
    image:
      "https://en.wikipedia.org/wiki/Great_Wall_of_China#/media/File:The_Great_Wall_of_China_at_Jinshanling-edit.jpg",
    password,
    places: [],
  });

  try {
    await newUser.save();
  } catch (err) {
    const error = new HttpError("Signing Up failed. Please try again!", 500);
    return next(error);
  }

  res.status(201).json({ user: newUser });
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

  if (!registeredUser || registeredUser.password !== password) {
    throw new HttpError(
      "Could not identify user, credentials seem to be wrong",
      401,
    );
  }

  res.json({ message: "Successfully Logged In!" });
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
