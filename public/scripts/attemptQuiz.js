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
});

