/**
 * Initialization function that will be called from the view switcher, whenever the view is requested
 * @param {object} initOptions An object with init options - get passed from the view switcher
 */
const attemptQuizInit = (initOptions) => {
  //Retrieve the data for the requested quiz
  $.ajax({
    method: "GET",
    url: `/api/quizzes/${initOptions.quizId}`
  }).done((res) => {
    renderQuizAttempt(attemptQuizElement(res));
  });
}

//Register the init function
initStore.storeInitializer("attempt-quiz", attemptQuizInit);

/**
 * Parse the form and score the quiz
 * @returns object with scoring data: {totalQuestions, correctAnswers, percentage, score}
 */
const scoreQuiz = () => {
  const questionContainers = $("#attempt-quiz > article");
  const totalQuestions = questionContainers.length;
  let correctAnswers = 0;
  for (const questionContainer of questionContainers) {
    const selectedOption = $(questionContainer).find('.selected')[0];
    const answerIsCorrect = $(selectedOption).hasClass('correct');
    if (answerIsCorrect) {
      correctAnswers++;
    }
  }
  const result = {
    totalQuestions,
    correctAnswers,
    percentage: `${Math.round(correctAnswers / totalQuestions * 100)}%`,
    score: `${correctAnswers}/${totalQuestions}`,
  };
  return result;
};

const attemptQuizElement = (quizObj) => {
  let quizElement = `<div id="quiz-title" class="container">${quizObj.name}</div>`
  for (let q of quizObj.questions) {
    quizElement +=
      `<article class="container">
        <div class="question-content">
          ${q.questionString}
        </div>
        <div class="options-container">`;
        for (let o of q.options) {
          o.isCorrect ? quizElement += `<button class="each-option correct">${o.content}</button>` : quizElement += `<button class="each-option">${o.content}</button>`;
        }
    quizElement +=
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

$(document).ready(function() {
  //event listener for attempt quiz link
  $(document).on('click', '.each-option', function (e) {
    $(this).siblings().removeClass("selected")
    $(this).removeClass("unselected");
    $(this).siblings().addClass("unselected")
    $(this).addClass("selected");
  });

  /**
   * Event listener for submitting/scoring
   */
  $("#attempt-quiz").on('click', '#submit-attempt', function() {
    console.log(scoreQuiz());
  });
});

