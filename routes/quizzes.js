/*
 * All routes for quizzes are defined here
 * Since this file is loaded in server.js into api/quizzes,
 *   these routes are mounted onto /quizzes
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const quizModule = require('../modules/quizModule');

module.exports = (db) => {
  //Get all quizzes
  router.get("/", (req, res) => {
    let query = `SELECT * FROM quizzes`;
    console.log(query);
    db.query(query)
      .then(data => {
        const quizzes = data.rows;
        res.json({ quizzes });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //Get one quiz (Matt)
  router.get("/:id", (req, res) => {
    let query = `SELECT * FROM quizzes`;
    console.log(query);
    db.query(query)
      .then(data => {
        const quizzes = data.rows;
        res.json({ quizzes });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //Store a new quiz (Johannes)
  router.post("/", express.json(), (req, res) => {
    quizModule.storeQuiz(db, 1, req.body).then(quizRecord => {
      res.json(quizRecord);
    }).catch(err => {
      res.status(500).json({error: err.message});
    });

  });

  return router;


};
