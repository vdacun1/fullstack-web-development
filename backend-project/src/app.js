const express = require("express");
const auth = require("./presentation/routes/auth");
const user = require("./presentation/routes/user");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", auth);
app.use("/user", user);

module.exports = app;
