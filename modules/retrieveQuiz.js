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


/**
 * Retrieves a single quiz with its questions and options
 * @param {object} db The database driver reference
 * @param {integer} quiz_id The id of the quiz to retrieve
 * @returns a promise to an object containing the quiz data
 */
const retrieveQuiz = (db, quizId) => {
  //Matt
  return new Promise ((resolve, reject) => {
    console.log(`Retrieving quiz object for quiz with id ${quizId}`);
    const quizObject = { "name": "Quiz name..."}; //see structure described above
    resolve(quizObject);
  });
};



module.exports = retrieveQuiz;
