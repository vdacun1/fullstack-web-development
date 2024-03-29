const express = require("express");

// Morgan is a middleware for logging HTTP requests in console.
const morgan = require("morgan");

// Helmet is a collection of 12 smaller middleware functions that set security-related HTTP headers.
const helmet = require("helmet");

const Session = require("./infrastructure/Session");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());

app.use(Session.setContext);

app.use("/auth", require("./presentation/routes/auth"));
app.use("/user", require("./presentation/routes/user"));

module.exports = app;
