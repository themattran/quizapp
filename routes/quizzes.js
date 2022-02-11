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
const setQuizVisibility = require('../modules/setQuizVisibility');

module.exports = (db) => {
  //Get list of quizzes
  router.get("/", (req, res) => {
    const options = req.query;
    //Get only public quizzes here
    options.isPublic = true;
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

  //Get quizzes for logged-in user
  router.get("/myquizzes", (req, res) => {
    if (req.session.user) {
      const options = req.query;
      options.userId = req.session.user.id;
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
    } else {
      //Unauthorized
      res.status(401).json({error: "Not authorized"});
    }
  });

  //Get one quiz
  router.get("/:id", (req, res) => {
    retrieveQuiz(db, req.params.id).then(quizObject => {
      res.json(quizObject);
    }).catch(err => {
      res.status(500).json({error: err.message});
    });
  });

  //Store a new quiz
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

  //Unlist a quiz
  router.post("/:id/unlist", (req, res) => {
    setQuizVisibility(db, req.params.id, false)
      .then(data => {
        const updatedRecord = data.rows[0];
        res.json(updatedRecord);
      }).catch(err => {
        res.status(500).json({error: err.message});
      });
  });

  //List a quiz
  router.post("/:id/list", (req, res) => {
    setQuizVisibility(db, req.params.id, true)
      .then(data => {
        const updatedRecord = data.rows[0];
        res.json(updatedRecord);
      }).catch(err => {
        res.status(500).json({error: err.message});
      });
  });

  return router;

};
