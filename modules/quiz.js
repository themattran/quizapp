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
 * @param {integer} quiz_id The id of the quiz to retrieve
 * @returns an object containing the quiz data
 */
const retrieveQuiz = (quizId) => {
  //Matt
};


/*
  For storeQuiz (POST route), the object received from the browser
  looks like this (difference to above is that no IDs are present
  because those records have not been generated yet):

  const quiz = {
    id: N/A,
    name: 'text',
    questions: [
      {
        id: N/A
        question_string,
        quiz_id: N/A
        options: [
          {
            id: N/A,
            question_id: N/A,
            content: 'text',
            is_correct: "bool"
          }
        ]
      }
    ]
  };
*/


/**
 * Takes a quiz object with questions and options and stores it to the database
 * @param {object} quiz The object with the quiz data
 * @returns newly created quiz record only (not questions and options)
 */
const storeQuiz = (quiz) => {
  //Johannes
};

module.exports = {
  retrieveQuiz,
  storeQuiz,
};
