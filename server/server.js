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
const google = require('googleapis').google;
const jwt = require('jsonwebtoken');

// Google's OAuth2 client
const OAuth2 = google.auth.OAuth2;
// Including our Oauth2 config file
const CONFIG = require('../config');

// Router Imports
const db = require('./models/models');
const apiRouter = require('./routes/apiRouter');

const app = express();
const PORT = 3000;

// Parses incoming requests
app.use(express.json()); // parses request body
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // parse cookie header and populate the property req.cookies

// Setting up EJS Views
app.set('view engine', 'ejs');
app.set('views', __dirname);
/** ****************** Server Route Handlers *********************** */

// Note: we wrap these two handlers in an if statement, because when we run in webpack in development, the index.html is served by localhost:8000 not localhost:3000 - Therefore, there's no need to serve up static files when running in development

app.get('/', (req, res) => {
  const oauth2Client = new OAuth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret,
    CONFIG.oauth2Credentials.redirect_uris[0]
  );
  // Obtain the google login link to which we'll send our users to give us access
  const loginLink = oauth2Client.generateAuthUrl({
    access_type: 'offline', // Indicates that we need to be able to access data continously without the user constantly giving us consent
    scope: CONFIG.oauth2Credentials.scopes, // Using the access scopes from our config file
  });

  res.render(path.resolve(__dirname, '../client/index'), { loginLink });
});

app.get('/auth_callback', (req, res) => {
  const oauth2Client = new OAuth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret,
    CONFIG.oauth2Credentials.redirect_uris[0]
  );
  
  if (req.query.error) {
    // The user did not give us permission.
    return res.redirect('/');
  } else {
    oauth2Client.getToken(req.query.code, function (err, token) {
      if (err) return res.redirect('/');
      console.log('TOKEN: ', token);
      // Store the credentials given by google into a jsonwebtoken in a cookie called 'jwt'
      res.cookie('jwt', jwt.sign(token, CONFIG.JWTsecret));
      
      return res.redirect('/home');
    });
  }
});

app.get('/home', (req, res) => {
  if (!req.cookies.jwt) {
    // We haven't logged in
    return res.redirect('/');
  }
  // Create an OAuth2 client object from the credentials in our config file
  const oauth2Client = new OAuth2(
    CONFIG.oauth2Credentials.client_id,
    CONFIG.oauth2Credentials.client_secret,
    CONFIG.oauth2Credentials.redirect_uris[0]
  );
  // Add this specific user's credentials to our OAuth2 client
  oauth2Client.credentials = jwt.verify(req.cookies.jwt, CONFIG.JWTsecret);
 
  return res.render(path.resolve(__dirname, '../client/home'));
});

// Unknown Endpoint Error Handler
app.use('/', (req, res) => {
  return res.status(404).json('404 Not Found');
});

// Global Error Handler
app.get('/', (req, res, next, err) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occured' },
  };
  const errorObj = Object.assign(defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

// Open up server on PORT
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});

module.exports = app;
