//This script takes care of switching the views in the single-page app

/**
 * Make all section elements that are first children of the <body> tag invisible
 */
const hideAllViews = () => {
  $("body > section").hide();
};

/**
 * Make the section element with the id viewName visible
 * @param {string} viewName
 */
const showView = (viewName) => {
  $(`#${viewName}`).show();
};

/**
 * Switch the to view with the given name
 * @param {string} viewName
 */
const switchToView = (viewName) => {
  console.log(`Switching to view ${viewName} (isLoggedIn = ${isLoggedIn()})`);
  hideAllViews();
  showView(viewName);
};



$(document).ready(function() {

  /**
   * Add event listeners to the navigation links to show each view
   */
  $(".navlink").on('click', function(e) {
    e.preventDefault();
    const viewName = $(this).attr('data');
    const isProtectedView = ["my-quizzes", "create-quiz"].includes(viewName);
    if (isLoggedIn() || !isProtectedView) {
      //User is logged in or requested a public view -> proceed
      switchToView(viewName);
    } else {
      //User is not logged in and requested a protected view -> redirect to login
      switchToView("login");
    }
  });

  $("#nav_login").click(function() {
    if (isLoggedIn()) {
      logout();
    }
  });

  /**
   * Start with home screen (list-quizzes)
   */
  switchToView('list-quizzes');
});
