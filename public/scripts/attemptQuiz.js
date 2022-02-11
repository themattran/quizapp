let quizObj = {
  "name": "Third quiz",
  "questions": [
    {
      "question_string": "who is president in Ukraine?",
      "options": [
        {
          "content": "Volodymyr Zelensky",
          "is_correct": true
        },
        {
          "content": "Joe Biden",
          "is_correct": false
        },
        {
          "content": "Vladimir Putin",
          "is_correct": false
        }
      ]
    },
    {
      "question_string": "who is president in the US?",
      "options": [
        {
          "content": "Volodymyr Zelensky",
          "is_correct": false
        },
        {
          "content": "Donald Trump",
          "is_correct": false
        },
        {
          "content": "Joe Biden",
          "is_correct": true
        },
        {
          "content": "Vladimir Putin",
          "is_correct": false
        }
      ]
    }
  ]
};

const attemptQuizElement = (quizObj) => {
  let quizElement = `<div id="quiz-title">${quizObj.name}</div>`
  for (let q of quizObj.questions) { 
    quizElement += 
      `<article>
        <div id="question-content">
          ${q.question_string}
        </div>
        <div id="options-container">`;
        for (let o of q.options) {
          quizElement += 
          `<button id="each-option">
            ${o.content}
          </button>`
        }
    quizElement += 
    `</div>
    </article>`;
  }
  return quizElement;
  }

 const renderQuizAttempt = function (quiz) {
   $("#my-quizzes").append(quiz);
 }

 $(document).ready(function() {
  $("#nav_my-quizzes").click(renderQuizAttempt(attemptQuizElement(quizObj)));
 })

//  <div id="quiz-title">
//   ${quizObj.name}
// </div>
// <% for (let q of quizObj.questions) { %>
//  <article>
//    <div id="question-content">
//      ${q.question_string}
//    </div>
//    <div id="options-container">
//    <% for (let o of q.options) { %>
//      <button id="each-option">
//        ${o.content}
//      </button>
//    <% } %>
//    </div>
//  </article>
//  <% } %>