/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(res => {
        const users = res.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/:user_id/createquiz", (req, res) => {

    let queryString = `
    INSERT INTO quizzes (name, user_id)
    VALUES ($1, $2);`
    let values = [req.body.name, req.params.user_id];

    db.query(queryString, values)
    .then(res => {
      const users = res.rows;
      return users
    })
    .catch(err => {
      res
      .status(500)
      .json({ error: err.message });
    });
  });
  
  return router;
};


