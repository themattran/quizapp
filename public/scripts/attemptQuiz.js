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
    percentage: Math.round(correctAnswers / totalQuestions * 100),
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
          o.isCorrect ? quizElement += `<button class="container each-option correct">${o.content}</button>` : quizElement += `<button class="container each-option">${o.content}</button>`;
        }
    quizElement +=
    `</div>
    </article>`;
  }
  return quizElement;
}

const scoreElement = (score) => {
  let url;
  if (score.percentage === 100) {
    url = "https://i.imgur.com/y4HTi3B.gif";
  } else if (score.percentage < 100 && score.percentage > 80){
    url = "https://c.tenor.com/x8dTXjiggP0AAAAd/itysl-bottle.gif";
  } else if (score.percentage <= 80 && score.percentage > 60) {
    url = "https://c.tenor.com/7ms_eNspHEEAAAAC/itysl-i-think-you-should-leave.gif";
  } else if (score.percentage <= 60 && score.percentage > 40) {
    url = "https://i.imgur.com/Sa75Uzg.gif";
  } else if (score.percentage <= 40 && score.percentage > 15) {
    url = "https://media0.giphy.com/media/YmbRfeiISGdKXguBvE/giphy.gif?cid=4d1e4f2915d7fafe553499bc77d1f7027874022646fe38e4&rid=giphy.gif";
  } else if (score.percentage <= 15) {
    url = "https://c.tenor.com/IRXQni1lHxgAAAAd/karl-havoc.gif";
  }
  return `<div>
  <article class="container score-container">
  You got ${score.score} questions correct!
  <img src="${url}" class="gif">
  <div class="icons">
    <i class="fa-solid fa-link"></i>
    Share your result
  </div>
  </article>
  </div>`
};

const copyText = function() {
  let text = $(".score-container").text().trim().slice(0, 29);
  navigator.clipboard.writeText(text)
  .then(() => {
    console.log(text);
  })
  .catch(err => {
    console.log('Something went wrong', err);
  });

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
    let score = scoreQuiz();
    console.log(score);
    window.scrollTo(0,document.body.scrollHeight);
    $(this).hide();
    $(this).parent().append(scoreElement(score));
  });

  $("#attempt-quiz").on('click', '.icons', function() {
    console.log("pls")
    copyText();
  });

});
