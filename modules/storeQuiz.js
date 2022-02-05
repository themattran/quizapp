/*
  Module to handle storing and retrieving of quizzes.

  Takes a single quiz object from the POST route handler which
  contains all the data (questions and options) of the new quiz,
  then stores the data into the respective database tables
  and returns just the new record from the quiz table

  Structure of received object:
  (id's are undefined because records don't exist yet)

  {
    id: undefined,
    name: string,
    questions: [
      {
        id: undefined
        question_string: string
        quiz_id: undefined
        options: [
          {
            id: undefined,
            question_id: undefined,
            content: text,
            is_correct: bool
          },
          ...
        ]
      },
      ...
    ]
  }

*/

/**
 * Takes a quiz object and stores the quiz record only (not questions or options) to the db
 * @param {object} db The database driver reference
 * @param {integer} userId The id of the user who owns the quiz
 * @param {object} quiz The quiz object to store, containing questions and options data
 * @returns a promise to the completed task of storing the quiz record
 */
const storeQuizRecord = (db, userId, quiz) => {
  return new Promise((resolve, reject) => {
    const query = {
      text: 'INSERT INTO quizzes (name, user_id) VALUES ($1, $2) RETURNING *;',
      values: [ quiz.name, userId ]
    };
    db.query(query)
      .then(data => {
        const quizRecord = data.rows[0];
        resolve(quizRecord);
      })
      .catch(err => {
        reject(err);
      });
  });
};

/**
 * Takes a (single) question object and stores its data to the db (just the question, not its options)
 * @param {object} db The database driver reference
 * @param {integer} quizId The id of the quiz the question belongs to
 * @param {object} question The question object
 * @returns a promise to the completed task of storing the question record
 */
const storeQuestionRecord = (db, quizId, question) => {
  return new Promise((resolve, reject) => {
    const query = {
      text: 'INSERT INTO questions (quiz_id, question_string) VALUES ($1, $2) RETURNING *;',
      values: [ quizId, question.question_string ]
    };
    db.query(query)
      .then(data => {
        const questionRecord = data.rows[0];
        resolve(questionRecord);
      })
      .catch(err => {
        reject(err);
      });
  });
};


/**
 * Takes a (single) option object and stores its data to the db
 * @param {object} db The database driver reference
 * @param {integer} questionId The id of the question to store the option for
 * @param {object} option The option object to store
 * @returns a promise to the completed task of storing the option
 */
const storeOptionRecord = (db, questionId, option) => {
  return new Promise((resolve, reject) => {
    const query = {
      text: 'INSERT INTO options (question_id, content, is_correct) VALUES ($1, $2, $3) RETURNING *;',
      values: [ questionId, option.content, option.is_correct ]
    };
    db.query(query)
      .then(data => {
        const optionRecord = data.rows[0];
        resolve(optionRecord);
      })
      .catch(err => {
        reject(err);
      });
  });
};

/**
 * Takes a (single) question object and a quizId and stores the question and its options in the db
 * @param {object} db The database driver reference
 * @param {integer} quizId The id of the quiz to store the question data for
 * @param {object} question The question object to store
 * @returns a promise to the completed task of storing the question with its options
 */
const storeQuestion = (db, quizId, question) => {
  return new Promise((resolve, reject) => {
    storeQuestionRecord(db, quizId, question)
      .then(questionRecord => {
        const promises = [];
        for (const option of question.options) {
          promises.push(storeOptionRecord(db, questionRecord.id, option));
        }
        Promise.all(promises).then(() => {
          resolve();
        }).catch(err => {
          reject(err);
        });
      });
  });
};

/**
 * Takes an array of questions and a quizId, and stores the questions/options for the quiz
 * @param {object} db The database driver reference
 * @param {integer} quizId The id of the quiz to store questions for
 * @param {array} questions The questions to be stored
 * @returns a Promise to the completed task of storing the questions
 */
const storeQuestions = (db, quizId, questions) => {
  return new Promise((resolve, reject) => {
    const promises = [];
    for (const question of questions) {
      promises.push(storeQuestion(db, quizId, question));
    }
    Promise.all(promises).then(() => {
      resolve();
    }).catch(err => {
      reject(err);
    });
  });
};

/**
 * Takes a quiz object with questions and options and stores it to the database
 * @param {object} db The database driver reference
 * @param {integer} user_id The user_id of the quiz owner
 * @param {object} quiz The object with the quiz data
 * @returns a promise to newly created quiz record only (not questions and options)
 */
const storeQuiz = (db, userId, quiz) => {
  //Johannes
  /*
    Approach

    store quiz record and retrieve id
    for each question {
      store question record, retrieve id
    }
    for each question record {
      for each option {
        store option record
      }
    }
  */
  return new Promise((resolve, reject) => {
    storeQuizRecord(db, userId, quiz)
      .then(quizRecord => {
        return storeQuestions(db, quizRecord.id, quiz.questions);
      })
      .then(questionRecords => {
        console.log("Stored quiz successfully");
        resolve();
      }).catch(err => {
        reject(err);
      });
  });

};

module.exports = storeQuiz;
