$(document).ready(function() {
  //event listener for attempt quiz link
  $(document).on('click', '.each-option', function (e) {
    $(this).siblings().removeClass("selected")
    $(this).removeClass("unselected");
    $(this).siblings().addClass("unselected")
    $(this).addClass("selected");
  });

  $(document).on('click', '#submit-attempt', function (e) {
    console.log(Array.isArray($(this).siblings()));
  });
});

