const express = require('express');

// Limiter is a middleware that limits the number of requests per IP.
const { limiter } = require('./infrastructure/Config');

// Morgan is a middleware for logging HTTP requests in console.
const { morgan } = require('./infrastructure/Logger');

// Helmet is a collection of 12 smaller middleware functions that set security-related HTTP headers.
const helmet = require('helmet');

// Context is a middleware that creates a new context for each request.
const Context = require('./infrastructure/Context');

const app = express();
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan);
app.use(Context.create);

app.use('/favicon.ico', (req, res) => res.status(204));

app.use('/toy', require('./presentation/routes/toy'));
app.use('/color', require('./presentation/routes/color'));
app.use('/accessory', require('./presentation/routes/accessory'));
app.use('/auth', require('./presentation/routes/auth'));
app.use('/user', require('./presentation/routes/user'));
app.use('/user-toy', require('./presentation/routes/user-toy'));

module.exports = app;
