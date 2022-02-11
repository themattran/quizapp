$(document).ready(function() {
  $(".quiz-card").click(function() {
    $.ajax({
      method: "GET",
      url: "/api/attemptQuiz"
    }).done((res) => {

    });
  })

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
        <a href="/api/quizzes/${id}">Attempt Quiz</a>
      </div>
`)};
