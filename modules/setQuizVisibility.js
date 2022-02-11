/*
  Module to list/unlist a quiz (set or remove the is_public flag)
*/

/**
 * List or unlist a quiz (set/unset is_public flag)
 * @param {integer} quizId The quiz to set the flag for
 * @param {boolean} isPublic Whether or not to set the flag
 * @returns a promise to the updated quiz record
 */
const setQuizVisibility = (db, quizId, isPublic) => {
  if (quizId > 0) {
    let val;
    isPublic ? val = 'true' : val = 'false';
    const queryString = `UPDATE quizzes SET is_public = ${val} WHERE id = ${quizId} RETURNING *`;
    return db.query(queryString);
  } else {
    console.log(quizId, "REJECTING");
    return Promise.reject({ error: "bad quizId"});
  }
};

module.exports = setQuizVisibility;
