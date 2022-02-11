$(document).ready(function() {
  //event listener for attempt quiz link
  $(document).on('click', '.attempt-link', function (e) {
    e.preventDefault();
    console.log($(this)[0].id);
    $.ajax({
      method: "GET",
      url: `/api/quizzes/${$(this)[0].id}`
    }).done((res) => {
      console.log(res);
      renderQuizAttempt(attemptQuizElement(res));
      //unclear how to switch view from here
    });
  });

  $.ajax({
        method: "GET",
        url: "/api/quizzes?limit=4&orderBy=random"
      }).done((res) => {
        console.log('res', res);
        renderQuizzes(res);
   });
});

//Function that renders quizzes and appends database questions to main container
const renderQuizzes = function(quizzes) {
  // $("#list-quizzes").empty();
  console.log('quizzes', quizzes);
  for (const quiz of quizzes) {
     $('#list-quizzes').append(quizCard(quiz.name, quiz.id));
  };
}

//Function that returns quiz card element
const quizCard = (name, id) => {
  return $(`
<div class="quiz-card">
        <i class="fa-duotone fa-gun-squirt"></i>
        <h1>${name}</h1>
        <a class="attempt-link" id="${id}">Attempt Quiz</a>
      </div>
`)};

//Function that returns interactable quiz element
const attemptQuizElement = (quizObj) => {
  let quizElement = `<div id="quiz-title" class="container">${quizObj.name}</div>`
  for (let q of quizObj.questions) { 
    quizElement += 
      `<article class="container">
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

//appending element returned by attemptQuizElement to the #attempt-quiz section
 const renderQuizAttempt = function (quiz) {
   $("#my-quizzes").empty();
   $("#my-quizzes").append(quiz);
 }

