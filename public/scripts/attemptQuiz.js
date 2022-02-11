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


$(document).ready(function() {
  //event listener for attempt quiz link
  $(document).on('click', '.each-option', function (e) {
    $(this).siblings().removeClass("selected")
    $(this).removeClass("unselected");
    $(this).siblings().addClass("unselected")
    $(this).addClass("selected");
  });

  // let rightAnswers = 0;
  // $(document).on('click', '#submit-attempt', function (e) {
  //   for (let element in $(this).siblings("article").children(".options-container").children()) {
  //     if (element.hasClass("selected") && element.hasClass("correct")) {
  //       rightAnswers += 1;
  //     }
  //   }
  //   console.log(rightAnswers);
  // });

  /**
   * Event listener for submitting/scoring
   */
  $("#attempt-quiz").on('click', '#submit-attempt', function() {
    console.log(scoreQuiz());
  });
});

