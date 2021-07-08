/**
 * ************************************
 *
 * @module loginController.js
 * @author Andy Kahn, Angela Franco, Cameron Simmons, Lorenzo Guevara, Mika Todd
 * @date 7/6/2021
 * @description Contains middleware that handle user comments 
 *
 * ************************************
 */
const db = require('../models/models');
const commentsController = {};
 
// GET ALL COMMENTS
commentsController.getComments = (req, res, next) => {
  
  const commentQuery = 'SELECT * FROM "public"."comments" LIMIT 100';
  
  db.query(commentQuery)
    .then((data) => {
      res.locals.comments = data.rows;
      return next();
    })
    .catch((err) => next({
      log:`error in get comments controller: ${err}`,
      message: {err: 'error occured in get comments controller'}
    }));
};

// POST A COMMENT
commentsController.addComment = (req, res, next) => {
  const {comment, group_id, user_id, created_at} = req.body;
    
  const commentPost = `INSERT INTO comments (comment, group_id, user_id, created_at)
    VALUES ($1, $2, $3, $4) RETURNING comment_id;`;

  const params = [comment, group_id, user_id, created_at];

  db.query(commentPost, params)
    .then((data) => {
      res.locals.comment = data.rows[0];
      return next();
    })
    .catch((err) => next({
      log:`error in post comments controller: ${err}`,
      message: {err: 'error occured in post comments controller'}
    }));
};

//  DELETE A COMMENT
commentsController.deleteComment = (req, res, next) => {
  const {comment_id} = req.body;
    
  const commentDelete = `DELETE FROM comments
  WHERE comment_id = $1 RETURNING comment_id;`;

  const params = [comment_id];

  db.query(commentDelete, params)
    .then((data) => {
      res.locals.comment = data.rows[0];
      console.log('successfully deleted comment');
      return next();
    })
    .catch((err) => next({
      log:`error in post comments controller: ${err}`,
      message: {err: 'error occured in post comments controller'}
    }));
};


module.exports = commentsController;