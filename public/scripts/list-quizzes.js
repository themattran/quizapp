$(document).ready(function() {
  $("#add-quiz").click(function() {
    $.ajax({
      method: "GET",
      url: "/api/createQuizzeesssssss"
    }).done((res) => {
      console.log('quizzes', res);
      renderQuizzes(res.quizzes.slice(0, 4));
    });
  })
  $.ajax({
        method: "GET",
        url: "/api/quizzes"
      }).done((res) => {
        console.log('quizzes', res);
        renderQuizzes(res.quizzes.slice(0, 4));
   });

});


const renderQuizzes = function(quizzes) {
  // $("#list-quizzes").empty();
  for (const quiz of quizzes) {
      $('#list-quizzes').append(quizCard(quiz.name));
  };
}

//load quizzes backwards

const quizCard = (name) => {
  console.log('name', name);
  return $(`
<div class="quiz-card">
        <i class="fa-duotone fa-gun-squirt"></i>
        <h1>${name}</h1>
      </div>
`)};




