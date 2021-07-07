/**
 * ************************************
 *
 * @module Server
 * @author Andy Kahn, Angela Franco, Cameron Simmons, Lorenzo Guevara, Mika Todd
 * @date 7/6/2021
 * @description Server listens on port 3000 and routes all incoming requests, handles global middleware errors and unknown endpoint errors
 *
 * ************************************
 */

// NPM Module Imports
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

// Router Imports
const db = require('./models/models');

const app = express();
const PORT = 3000;

// Parses incoming requests
app.use(express.json()); // parses request body
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser()); // parse cookie header and populate the property req.cookies

/** ****************** Server Route Handlers *********************** */

// Note: we wrap these two handlers in an if statement, because when we run in webpack in development, the index.html is served by localhost:8000 not localhost:3000 - Therefore, there's no need to serve up static files when running in development
if (process.env.NODE_ENV === 'production'){
  app.use('/build', express.static(path.join(__dirname, '../build')));
  app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
  });
}

// Unknown Endpoint Error Handler
app.use('/', (req, res) => {
  return res.status(404).json('404 Not Found');
});

// Global Error Handler
app.get('/', (req, res, next, err)=> {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occured' },
  };
  const errorObj = Object.assign(defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

// Open up server on PORT
app.listen(PORT, ()=> {
  console.log(`server is listening on port ${PORT}`);
});

module.exports = app;