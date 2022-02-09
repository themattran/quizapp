let db;

/**
 * Initialize the module by passing a database driver reference
 * @param {object} dbRef The reference to the pg pool object
 */
const init = (dbRef) => {
  db = dbRef;
};

/**
 * Check if user exists and return id
 * @param {string} userName
 * @returns a promise resolving in a valid user id, or false
 */
const userExists = (userName) => {
  return new Promise((resolve, reject) => {
    const query = {
      text: `SELECT * FROM users WHERE name = $1`,
      values: [userName]
    };

    db.query(query)
      .then(res => {
        if (res.rows.length > 0) {
          const userRecord = res.rows[0];
          resolve(userRecord.id);
        } else {
          resolve(false);
        }
      })
      .catch(err => {
        console.log(`Couldn't determine if user ${userName} exists`, err);
        reject(err);
      });
  });
};

/**
 * Create user record for passed in userName
 * @param {string} userName The user name to create a record for
 * @returns a promise to the new user's id
 */
const createUser = (userName) => {
  return new Promise((resolve, reject) => {
    const query = {
      text: `INSERT INTO users (name) VALUES ($1) RETURNING *;`,
      values: [userName]
    };

    db.query(query)
      .then(res => {
        const userRecord = res.rows[0];
        console.log(`Created user ${userName} with ID ${userRecord.id}`);
        resolve(userRecord.id);
      })
      .catch(err => {
        console.log(`Couldn't create user ${userName}`, err);
        reject(err);
      });
  });
};

/**
 * Get a user id for the provided user name. Creates the user record if it doesn't exist.
 * @param {string} userName
 * @returns a promise to a user id
 */
const getIdFor = (userName) => {
  return new Promise((resolve, reject) => {
    userExists(userName)
      .then(existingUserId => {
        if (existingUserId) {
          resolve(existingUserId);
        } else {
          createUser(userName)
            .then(newUserId => {
              resolve(newUserId);
            })
            .catch(err => {
              reject(err);
            });
        }
      })
      .catch(err => {
        console.log(`Unable to obtain ID for user ${userName}`, err);
        reject(err);
      });
  });
};

module.exports = {
  init,
  getIdFor,
};
