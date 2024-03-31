const express = require("express");

// Morgan is a middleware for logging HTTP requests in console.
const morgan = require("morgan");

// Helmet is a collection of 12 smaller middleware functions that set security-related HTTP headers.
const helmet = require("helmet");

const Context = require("./infrastructure/Context");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(helmet());

app.use(Context.create);

app.use("/auth", require("./presentation/routes/auth"));
app.use("/user", require("./presentation/routes/user"));

module.exports = app;
