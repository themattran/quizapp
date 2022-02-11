$(document).ready(function() {
  //event listener for attempt quiz link
  $(document).on('click', '.my-attempt-link', function (e) {
    e.preventDefault();
    console.log($(this)[0].id);
    $.ajax({
      method: "GET",
      url: `/api/quizzes/${$(this)[0].id}`
    }).done((res) => {
      console.log(res);
      renderQuizAttempt(attemptQuizElement(res));
      //unclear how to switch view from here
      switchToView(".my-quizzes");
    });
  });

  $.ajax({
        method: "GET",
        url: "/api/quizzes?limit=4&orderBy=random"
      }).done((res) => {
        console.log('res', res);
        renderMyQuizzers(res);
   });
});

//Function that renders quizzes and appends database questions to main container
const renderMyQuizzers = function(quizzes) {
  // $("#list-quizzes").empty();
  console.log('quizzes', quizzes);
  for (const quiz of quizzes) {
     $('#my-quizzes').append(quizCard(quiz.name, quiz.id));
  };
}

//Function that returns quiz card element
const quizCard = (name, id) => {
  return $(`
<div class="my-quiz-card">
        <i class="fa-duotone fa-gun-squirt"></i>
        <h1>${name}</h1>
        <a class="my-attempt-link" id="${id}">Attempt Quiz</a>
        <a class="my-share-link" id="">Share Link</a>
        <div class= "my-option-node">
        <fieldset>
             <input type="checkbox" id="correct" name="correct">
             <span>Correct?</span>
      </div>
`)};

//Function that returns interactable quiz element
const attemptQuizElement = (quizObj) => {
  let myQuizElement = `<div id="my-quiz-title" class="container">${quizObj.name}</div>`
  for (let q of quizObj.questions) {
    myQuizElement +=
      `<article class="container">
        <div class="question-content">
          ${q.questionString}
        </div>
        <div class="options-container">`;
        for (let o of q.options) {
          o.isCorrect ? myQuizElement += `<button class="each-option correct">${o.content}</button>` : myQuizElement += `<button class="each-option">${o.content}</button>`;
        }
    myQuizElement +=
    `</div>
    </article>`;
  }
  return quizElement;
  }

//appending element returned by attemptQuizElement to the #attempt-quiz section
 const renderQuizAttempt = function (quiz) {
   $("#attempt-quiz").empty();
   $("#attempt-quiz").append(quiz);
   $("#attempt-quiz").append('<button class="container" id="submit-attempt">Submit and show my score!</button>');
 }

