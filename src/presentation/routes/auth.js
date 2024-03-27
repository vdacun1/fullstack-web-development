const express = require("express");
const RegisterRequest = require("../../application/requests/RegisterRequest");
const LoginRequest = require("../../application/requests/LoginRequest");

const auth = express.Router();

auth.post("/login", LoginRequest.validate(), function (req, res) {
  return LoginRequest.handle(req, res);
});

auth.post("/logout", function (req, res) {
  return res.send("Logout");
});

module.exports = auth;
