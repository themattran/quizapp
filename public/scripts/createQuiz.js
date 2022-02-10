//Element representing additional option
const additionalOption =
  `<div class="modular-option-node dynamically-added">
    <textarea id="new-option" name="option" placeholder="Enter a possible answer"></textarea>
    <fieldset>
      <input type="checkbox" id="correct" name="correct">
      <span>Correct?</span>
   </div>
   `;

//Element representing additional question
const additionalQuestion =
`<article id="question-option-container" class="dynamically-added">
<textarea id="new-quiz-question" name="question" placeholder="Enter your question" required=""></textarea>
<div id="options-parent">
  <div id="options-target">
  <div class="modular-option-node">
<textarea id="new-option" name="option" placeholder="Enter a possible answer"></textarea>
<fieldset>
  <input type="checkbox" id="correct" name="correct">
  <span>Correct?</span>
</div>
</div>
<button class="nother-option">+ Add an answer</button>
</div>
<div class="button-flex">
<button class="save-button">+ Add next question</button>
</div>
</article>`;

/**
 * Parse quiz data on form and return quiz object
 */
const parseQuiz = () => {
  const quizObject = {};

  //Find the quiz title
  const quizTitle = $("#new-quiz-title").val();
  quizObject.name = quizTitle;
  console.log("Begin parsing quiz: ", quizTitle);

  //Find the elements containing question data
  const questionContainers = $.find(".questions-container > article");

  quizObject.questions = [];

  //Loop through the question elements and assemble question data in turn
  for (const qCont of questionContainers) {
    //Find the question string for this question
    const qTextArea = $(qCont).find("> textarea")[0];
    const questionString = $(qTextArea).val();
    console.log("- Parsing question: ", questionString);

    const questionObject = {};
    questionObject.question_string = questionString;
    questionObject.options = [];

    //Find the elements containing the option data
    const questionOptionContainers = $(qCont).find(".modular-option-node");

    //Loop through options and build options array for this question
    for (const qoCont of questionOptionContainers) {
      const optionContent = $(qoCont).find("textarea").val();
      const optionCorrect = $(qoCont).find("input")[0].checked;
      console.log("  - Parsing option: ", optionContent, optionCorrect);

      const optionObject = {
        content: optionContent,
        is_correct: optionCorrect,
      };
      questionObject.options.push(optionObject);
    }

    quizObject.questions.push(questionObject);
  }

  console.log(`Finished parsing quiz with ${quizObject.questions.length} questions`);
  return quizObject;
};

/**
 * Reset the form
 */
const clearNewQuizForm = () => {
  console.log("MOIVING");
  $("#create-quiz form")[0].reset();
  //Remove all questions and add a new one back into the container
  $(".questions-container").empty().append(additionalQuestion);
};

$(document).ready(function() {

  $(document).on('click', '.nother-option', function(e) {
    e.preventDefault();
    $(this).parent().find("#options-target").append(additionalOption);
  })

  $(document).on('click', '.save-button', function(e) {
    e.preventDefault();
    $(this).hide();
    $(this).closest(".questions-container").append(additionalQuestion);
  })


  /**
   * Event handler for the submit quiz button: parse quiz and post JSON object to /api/quizzes,
   * then redirect to my-quizzes view (where the new quiz should show up in the list)
   */
  $(".submit-quiz-object").click(function(e) {
    e.preventDefault();
    const quizObject = parseQuiz();
    $.post("/api/quizzes", quizObject)
      .done(data => {
        console.log("Submitted new quiz successfully!",data);
        clearNewQuizForm();
        switchToView("my-quizzes");
      });
  });
});
