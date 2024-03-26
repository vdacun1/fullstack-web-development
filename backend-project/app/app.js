const express = require("express");
const auth = require("./presentation/routes/auth.js");
const user = require("./presentation/routes/user.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", auth);
app.use("/user", user);

module.exports = app;
