/*
 * All routes for options are defined here
 * Since this file is loaded in server.js into api/options,
 *   these routes are mounted onto /options
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    let query = `SELECT * FROM options`;
    console.log(query);
    db.query(query)
      .then(data => {
        const options = data.rows;
        res.json({ options });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
