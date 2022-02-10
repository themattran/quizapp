$(document).ready(function() {
  $("#add-quiz").click(function() {
    alert("hello");
  })
  $.ajax({
        method: "GET",
        url: "/api/quizzes"
      }).done((res) => {
        console.log('quizzes', res);
        for(quiz of res.quizzes) {
         $("<div>").text(quiz.name).appendTo($("body"));
      }
   });;

   

});
