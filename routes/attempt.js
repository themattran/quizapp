/*
 * The attempt quiz route is defined in here
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  //Attempt the quiz with :id
  router.get("/quiz/:id", (req, res) => {
    console.log(`User request to attempt quiz ${req.params.id}`);
    const templateVars = {
      attemptQuizId: parseInt(req.params.id),
    };
    res.render("index", templateVars);
  });

  return router;

};
