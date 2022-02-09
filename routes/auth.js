/*
 * All routes for Login/Logout/Register are defined here
 * Since this file is loaded in server.js into api/auth,
 *   these routes are mounted onto /auth
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();


module.exports = (db) => {

  const users = require('../modules/users');
  users.init(db);

  /**
   * Login the given user/store username and id to req.session.user.
   * Return JSON acknowledgment: { userId, userName }
   * No authentication implemented.
   */
  router.post("/login", (req, res) => {
    const userName = req.body.userName;
    users.getIdFor(userName)
      .then(userId => {
        const user = {
          name: userName,
          id: userId,
        };
        console.log(`User ${user.name} logged in (id: ${user.id})`);
        req.session.user = user;
        res
          .status(200)
          .json({
            userId,
            userName,
            message: "Login successful",
          });
      })
      .catch(err => {
        res
          .status(500)
          .json(err);
      });
  });

  /**
   * Logout/remove req.session.user object
   * Return JSON acknowledgment: { message }
   */
  router.post("/logout", (req, res) => {
    const user = req.session.user;
    if (user) {
      console.log(`User ${user.name} logged out (id: ${user.id})`);
      delete req.session.user;
    } else {
      console.log(`Redundant logout request: session was not logged in`);
    }
    res
      .status(200)
      .json({message: "You have logged out - goodbye."});
  });
  return router;
};


