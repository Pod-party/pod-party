/**
 * ************************************
 *
 * @module loginController.js
 * @author Andy Kahn, Angela Franco, Cameron Simmons, Lorenzo Guevara, Mika Todd
 * @date 7/6/2021
 * @description Contains middleware that handle user users 
 *
 * ************************************
 */
const db = require('../models/models');
const usersController = {};
  
// GET ALL userS
usersController.getUsers = (req, res, next) => {
   
  const userQuery = 'SELECT * FROM "public"."users" LIMIT 100';
   
  db.query(userQuery)
    .then((data) => {
      res.locals.users = data.rows;
      return next();
    })
    .catch((err) => next({
      log:`error in get users controller: ${err}`,
      message: {err: 'error occured in get users controller'}
    }));
};
 
// POST A user
usersController.addUser = (req, res, next) => {
  const {username, email, first_name, last_name, nickname, created_at} = req.body;
     
  const userPost = `INSERT INTO users (username, email, first_name, last_name, nickname, created_at)
   VALUES ($1, $2, $3, $4, $5, $6);`;
 
  const params = [username, email, first_name, last_name, nickname, created_at];
 
  db.query(userPost, params)
    .then((data) => {
      res.locals.user = data.rows[0];
      return next();
    })
    .catch((err) => next({
      log:`error in post users controller: ${err}`,
      message: {err: 'error occured in post users controller'}
    }));
};
 
module.exports = usersController;