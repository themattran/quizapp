/*
  Module to handle retrieving of quizzes.

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


  //Matt
  /*
    create empty result object
    retrieve quiz record
    put quiz name and id in result object
    retrieve the questions
    add empty array of questions into object
    for question of questions {
      create empty question object
      Put questions.id, question_string, quiz_id into that object
      retrieve options
      add empty array of options into results object
      for option of options {
        create an empty option object
        Put options.id, content, is_correct, into that object
        push to options array
      }
      push to questions array
    }
    return quizObject
*/

/**
 * Retrieve a single quiz record from the db
 * @param {*} db The database driver reference
 * @param {*} quizId The id of the quiz record to retrieve
 * @returns a promise to the quiz record
 */
const retrieveQuizRecord = (db, quizId) => {
  return new Promise((resolve, reject) => {

    const queryString = `
    SELECT * FROM quizzes
    WHERE id = ${quizId};`;

    db.query(queryString)
      .then(res => {
        resolve(res.rows[0]);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const retrieveQuestionRecords = (db, quizId) => {
  return new Promise((resolve, reject) => {

    const queryString = `
    SELECT * FROM questions
    WHERE quiz_id = ${quizId};`;

    db.query(queryString)
      .then(res => {
        resolve(res.rows);
      })
      .catch(err => {
        reject(err);
      });

  });
};

const retrieveOptionRecords = (db, questionId) => {
  return new Promise((resolve, reject) => {

    const queryString = `
    SELECT * FROM options
    WHERE question_id = ${questionId};`;

    db.query(queryString)
      .then(res => {
        resolve(res.rows);
      })
      .catch(err => {
        reject(err);
      });
  });
};



/**
 * Retrieves a single quiz with its questions and options
 * @param {object} db The database driver reference
 * @param {integer} quiz_id The id of the quiz to retrieve
 * @returns a promise to an object containing the quiz data
 */

const retrieveQuiz = (db, quizId) => {
  //Matt
  return new Promise((resolve, reject) => {
    console.log(`Retrieving quiz object for quiz with id ${quizId}`);
    const quizObject = { id: quizId };
    retrieveQuizRecord(db, quizId)
      .then(quizRecord => {
        quizObject.name = quizRecord.name;
        return retrieveQuestionRecords(db, quizId);
      })
      .then(questionRecords => {
        quizObject.questions = [];
        const promises = [];
        for (const questionRecord of questionRecords) {
          promises.push(retrieveOptionRecords(db, questionRecord.id));
        }
        Promise.all(promises)
          .then(optionRecordArrays => {
            for (let i = 0; i < questionRecords.length; i++) {
              const questionRecord = questionRecords[i];
              const questionObject = {
                questionString: questionRecord.question_string,
                id: questionRecord.id,
                options: []
              };
              //Will need to grab optionRecordArrays[i] for the options for this question
              const optionRecords = optionRecordArrays[i];
              for (const optionRecord of optionRecords) {
                const optionObject = {
                  content: optionRecord.content,
                  isCorrect: optionRecord.is_correct
                };
                questionObject.options.push(optionObject);
              }
              quizObject.questions.push(questionObject);
            }
            return resolve(quizObject);
          });
      });
  });
};




module.exports = retrieveQuiz;
