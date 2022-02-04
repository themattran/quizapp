/*
  Module to handle storing and retrieving of quizzes.

  Exports two functions:

  ** retrieveQuiz: ******************************************************
        Retrieves a single quiz with all its data (questions and options)
        from the database, assembles it into a JSON object, and returns
        that object to the caller (which will then send it to back to the browser)

        Structure of returned quiz object:

          {
            id: integer,
            name: string,
            questions: [
              {
                id: integer
                question_string: string
                quiz_id: integer
                options: [
                  {
                    id: integer,
                    question_id: integer,
                    content: text,
                    is_correct: bool
                  },
                  ...
                ]
              },
              ...
            ]
          }

  ** storeQuiz: ******************************************************
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
 * Retrieves a single quiz with its questions and options
 * @param {object} db The database driver reference
 * @param {integer} quiz_id The id of the quiz to retrieve
 * @returns a promise to an object containing the quiz data
 */
const retrieveQuiz = (db, quizId) => {
  //Matt
};



/* Functions related to storeQuiz below ********************************************************/

const storeQuizRecord = (db, user_id, quiz) => {
  return new Promise((resolve, reject) => {

    const query = {
      text: 'INSERT INTO quizzes (name, user_id) VALUES ($1, $2) RETURNING *;',
      values: [ quiz.name, user_id ]
    }

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


const storeQuestionRecord = (db, quizId, question) => {
  return new Promise((resolve, reject) => {

    const query = {
      text: 'INSERT INTO questions (quiz_id, question_string) VALUES ($1, $2) RETURNING *;',
      values: [ quizId, question.question_string ]
    }
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


const storeOptionRecord = (db, questionId, option) => {
  return new Promise((resolve, reject) => {

    const query = {
      text: 'INSERT INTO options (question_id, content, is_correct) VALUES ($1, $2, $3) RETURNING *;',
      values: [ questionId, option.content, option.is_correct ]
    }
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

const storeQuestion = (db, quizId, question) => {
  return new Promise ((resolve, reject) => {
    storeQuestionRecord(db, quizId, question)
      .then(questionRecord => {
        console.log("Stored Question Record for: ", questionRecord.question_string);
        const promises = [];

        for (option of question.options) {
          promises.push(storeOptionRecord(db, questionRecord.id, option));
        }

        Promise.all(promises).then(() => {
          console.log(`All option for question ${questionRecord.id} stored.`);
        });

      });
  });
}

const storeQuestions = (db, quizId, questions) => {
  return new Promise ((resolve, reject) => {

    const promises = [];

    for (question of questions) {
      promises.push(storeQuestion(db, quizId, question));
    };

    Promise.all(promises).then(values => {
      console.log("Stored all question records", values);
      resolve();
    });

  });
};
/**
 * Takes a quiz object with questions and options and stores it to the database
 * @param {object} db The database driver reference
 * @param {object} user_id The user_id of the quiz owner
 * @param {object} quiz The object with the quiz data
 * @returns a promise to newly created quiz record only (not questions and options)
 */
const storeQuiz = (db, userId, quiz) => {
  //Johannes
  /*
    generate quiz record and retrieve id
    for each question {
      generate question record and retrieve id
      for each option {
        generate option record
      }
    }
  */
  return new Promise ((resolve, reject) => {
    storeQuizRecord(db, userId, quiz)
      .then(quizRecord => {
        console.log("Stored Quiz Record for:", quizRecord.name);
        storeQuestions(db, quizRecord.id, quiz.questions);
      })
      .then(questionRecords => {
        console.log("Stored all questions");
        resolve();
      });
  });

};

module.exports = storeQuiz;
