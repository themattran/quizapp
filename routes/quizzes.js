/*
 * All routes for quizzes are defined here
 * Since this file is loaded in server.js into api/quizzes,
 *   these routes are mounted onto /quizzes
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const storeQuiz = require('../modules/storeQuiz');
const retrieveQuiz = require('../modules/retrieveQuiz');
const getQuizzes = require('../modules/getQuizzes');

module.exports = (db) => {
  //Get all quizzes
  router.get("/", (req, res) => {
    const options = req.query;
    getQuizzes(db, options)
      .then(quizRecords => {
        res
          .status(200)
          .json(quizRecords);
      })
      .catch(err => {
        res
          .status(500)
          .json(err);
      });
  });

  //Get one quiz (Matt)
  router.get("/:id", (req, res) => {
    retrieveQuiz(db, req.params.id).then(quizObject => {
      res.json(quizObject);
    }).catch(err => {
      res.status(500).json({error: err.message});
    });
  });

  //Store a new quiz (Johannes)
  router.post("/", express.json(), (req, res) => {
    if (req.session.user && req.session.user.id > 0) {
      storeQuiz(db, req.session.user.id, req.body).then(() => {
        res.json({message:"success"});
      }).catch(err => {
        res.status(500).json({error: err.message});
      });
    } else {
      res.status(401).json({error: "Not allowed"});
    }
  });

  return router;


};
