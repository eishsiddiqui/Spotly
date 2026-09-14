const { v4: uuidv4 } = require("uuid");

const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Max Schwarz",
    email: "test@test.com",
    password: "password123",
  },
  {
    id: "u2",
    name: "Sarah Connor",
    email: "sarah@example.com",
    password: "sarah123",
  },
  {
    id: "u3",
    name: "John Smith",
    email: "john@example.com",
    password: "john123",
  },
  {
    id: "u4",
    name: "Emily Johnson",
    email: "emily@example.com",
    password: "emily123",
  },
  {
    id: "u5",
    name: "Ali Hassan",
    email: "ali@example.com",
    password: "ali123",
  },
  {
    id: "u6",
    name: "Sophia Williams",
    email: "sophia@example.com",
    password: "sophia123",
  },
  {
    id: "u7",
    name: "David Brown",
    email: "david@example.com",
    password: "david123",
  },
];

function getUsers(req, res, next) {
  res.json({ users: DUMMY_USERS });
}

function signup(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed, please check your data.", 422);
  }
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => u.email === email);

  if (hasUser) {
    throw new HttpError("Emailwith this user already exists!", 422);
  }

  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);
  res.status(201).json({ user: createdUser });
}

function login(req, res, next) {
  const { email, password } = req.body;

  const registeredUser = DUMMY_USERS.find((u) => u.email === email);
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
