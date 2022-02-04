const quiz = {
  id: 'integer',
  name: 'text',
  questions: [
    {
      id,
      question_string,
      quiz_id,
      options: [
        {
          id: 'integer',
          question_id: 'integer',
          content: 'text',
          is_correct: "bool"
        }
      ]
    }
  ]
};

/*
Post Quiz

create quiz record
for each question
  create question record
  for each option
    create option record 

*/
