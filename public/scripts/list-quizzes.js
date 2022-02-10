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
        url: "/api/quizzes?orderBy=random&limit=4"
      }).done((res) => {
        console.log('quizzes', res);
        renderQuizzes(res.quizzes);
   });

});

//Function that renders quizzes and appends database questions to main container
const renderQuizzes = function(quizzes) {
  // $("#list-quizzes").empty();
  for (const quiz of quizzes) {
     $('#home-list-quizzes').append(quizCard(quiz.name, quiz.id));
  };
}

//Function that returns quiz card element
const quizCard = (name, id) => {
  return $(`
<div class="quiz-card">
        <i class="fa-duotone fa-gun-squirt"></i>
        <h1>${name}</h1>
        <a href="/views/attemptQuiz/${id}">Attemp Quiz</a>
      </div>
`)};




