/**
 * Initialization function that will be called from the view switcher, whenever the view is requested
 * @param {object} initOptions An object with init options - get passed from the view switcher
 */
 const myListQuizzesInit = (initOptions) => {
  //Retrieve the quizzes to list
  $.ajax({
    method: "GET",
    url: "/api/quizzes/myquizzes"
  }).done((res) => {
    renderMyQuizzes(res);
  });
};

//Register the init function
initStore.storeInitializer("my-quizzes", myListQuizzesInit);
$(document).ready(function() {
  //event listener for attempt quiz link
  $(document).on('click', '.my-attempt-link', function (e) {
    e.preventDefault();
    const quizId = $(this)[0].id;
    console.log("Attempt Quiz ID", quizId);
    switchToView('attempt-quiz', {quizId});
  });

  //Unlist Route checkout +
  $(document).on('click', '.public-checkbox', function (e) {
    e.preventDefault();
    const quizId = $(this)[0].id.substring(6);
    console.log('quizId2', quizId);
    const currentState = $(this).val();
    console.log('currentState', currentState);
    let postfix;
    if (!currentState) {
      postfix = 'unlist';
    } else {
      postfix = 'list';
    }

    $.ajax({
      method: "POST",
      url: `/api/quizzes/${quizId}/${postfix}`
    }).done((res) => {
      $(this).prop("checked", res.is_public);
    });
  });
});

//Function that renders quizzes and appends database questions to main container
const renderMyQuizzes = function(quizzes) {
  // $("#list-quizzes").empty();
  console.log('quizzes', quizzes);
  $("#my-quizzes").empty();
  for (const quiz of quizzes) {
     $('#my-quizzes').append(myQuizCard(quiz.name, quiz.id));
  };
}

//Function that returns quiz card element
const myQuizCard = (name, id) => {
  return `
<div class="my-quiz-card">
        <i class="fa-duotone fa-gun-squirt"></i>
        <h1>${name}</h1>
        <a class="my-attempt-link" id="${id}">Attempt Quiz</a>
        <a class="my-share-link" id="">Share Link</a>
        <fieldset>
             <input type="checkbox" id="public${id}" class= "public-checkbox" name="correct">
             <span>Make Public</span>
`};

//Function that returns interactable quiz element
const myAttemptQuizElement = (quizObj) => {
  let myQuizElement = `<div id="my-quiz-title" class="container">${quizObj.name}</div>`
  console.log('quizObj', quizObj);
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

//appending element returned by myAttemptQuizElement to the #attempt-quiz section
 const myRenderQuizAttempt = function (quiz) {
   $("#attempt-quiz").empty();
   $("#attempt-quiz").append(quiz);
   $("#attempt-quiz").append('<button class="container" id="submit-attempt">Submit and show my score!</button>');
 }

