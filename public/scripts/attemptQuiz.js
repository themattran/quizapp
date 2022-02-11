const attemptQuizElement = (quizObj) => {
  let quizElement = `<div id="quiz-title">${quizObj.name}</div>`
  for (let q of quizObj.questions) { 
    quizElement += 
      `<article>
        <div id="question-content">
          ${q.questionString}
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
   $("#attempt-quiz").append(quiz);
 }

 $(document).ready(function() {
  $("#nav_my-quizzes").click(function() {
    $.ajax({
      method: "GET",
      url: "/api/quizzes/3"
    }).done((res) => {
      renderQuizAttempt(attemptQuizElement(res));
    });
  });
 });
