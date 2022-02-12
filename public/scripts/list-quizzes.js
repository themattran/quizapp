/**
 * Initialization function that will be called from the view switcher, whenever the view is requested
 * @param {object} initOptions An object with init options - get passed from the view switcher
 */
 const listQuizzesInit = (initOptions) => {
  //Retrieve the quizzes to list
  $.ajax({
    method: "GET",
    url: "/api/quizzes?limit=4&orderBy=random"
  }).done((res) => {
    renderQuizzes(res);
  });
};

//Register the init function
initStore.storeInitializer("list-quizzes", listQuizzesInit);

$(document).ready(function() {
  //event listener for attempt quiz link
  $(document).on('click', '.attempt-link', function (e) {
    e.preventDefault();
    const quizId = $(this)[0].id;
    switchToView("attempt-quiz", { quizId });
  });
});

//Function that renders quizzes and appends database questions to main container
const renderQuizzes = function(quizzes) {
  // $("#list-quizzes").empty();
  console.log('quizzes', quizzes);
  $('#list-quizzes').empty();
  for (const quiz of quizzes) {
     $('#list-quizzes').append(quizCard(quiz.name, quiz.id));
  };
}

//Function that returns quiz card element
const quizCard = (name, id) => {
  return $(`
<div id="${id}" class="quiz-card attempt-link">
        <i class="fa-duotone fa-gun-squirt"></i>
        <h1>${name}</h1>
      </div>
`)};

