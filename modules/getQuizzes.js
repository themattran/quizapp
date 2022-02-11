/*
  Module to handle retrieving quiz records based on options

  Valid options:

  options.userId = (integer)  Return only quizzes owned by user with this id
  options.limit = (integer)   Limit the number of returned records
  options.orderBy = latest    Newest first (highest ID)
  options.orderBy = random    Randomize the order of returned records
  options.isPublic = (bool)   If set, return only quizzes that match the flag

*/


/**
 * Assemble a SELECT querystring for the quizzes table based on the options passed
 * @param {object} options An object with filtering options (see details at top of file)
 * @returns {string} a SELECT query
 */
const assembleSelectQuery = (options) => {
  if (options.orderBy) {
    options.orderBy = options.orderBy.toLowerCase();
  }
  let queryString = `
    SELECT quizzes.*, users.name AS user_name
    FROM quizzes
    JOIN users ON quizzes.user_id = users.id
    WHERE TRUE
  `;
  //Get quizzes that belong to user with userId
  if (options && options.userId > 0) {
    queryString += ` AND user_id = ${options.userId}`;
  }
  //Filter by visibility
  if (options && typeof options.isPublic === 'boolean') {
    let val;
    options.isPublic ? val = true : val = false;
    queryString += ` AND is_public = ${val}`;
  }
  //Ordering options
  if (options && options.orderBy) {
    const orderBy = options.orderBy.toLowerCase();
    switch (orderBy) {
    case 'random':
      //Order by: random
      queryString += ` ORDER BY RANDOM()`;
      break;
    case 'latest':
      //Order by: latest
      queryString += ` ORDER BY id DESC`;
      break;
    }
  }
  //Limit the maximum number of returned records
  if (options && options.limit > 0) {
    queryString += ` LIMIT ${options.limit}`;
  }
  return queryString;
};

/**
 * Get a promise to a set of quiz records
 * @param {object} db The reference to the database driver
 * @param {object} options An object containing filtering options
 * @returns a promise to an array of quiz records (with an added user_name column)
 */
const getQuizzes = (db, options) => {
  return new Promise((resolve, reject) => {
    const queryString = assembleSelectQuery(options);
    db.query(queryString)
      .then(res => {
        resolve(res.rows);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports = getQuizzes;
