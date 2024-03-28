const express = require("express");
const LoginRequest = require("../../application/requests/LoginRequest");

const auth = express.Router();

auth.post("/login", LoginRequest.validate(), async function (req, res) {
  return await LoginRequest.handle(req, res);
});

auth.post("/logout", function (req, res) {
  return res.send("Logout");
});

module.exports = auth;
