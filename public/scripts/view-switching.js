//This script takes care of switching the views in the single-page app

/**
 * Higher order function generating functions that allow views
 * to register and retrieve initialization callbacks
 * @returns {object} with storeInitializer, getInitializer functions
 */
const makeInitStore = () => {
  const initFunctions = {};

  /**
   * Register a callback to initialize a view
   * @param {string} viewname name of the view / id of its container
   * @param {function} initFunction an initialization function for this view
   */
  const storeInitializer = (viewname, initFunction) => {
    initFunctions[viewname] = initFunction;
  };

  /**
   * Retrieve an initializer function for a view
   * @param {string} viewname
   * @returns the init function for viewname, or undefined
   */
  const getInitializer = (viewname) => {
    return initFunctions[viewname];
  };

  return {
    storeInitializer,
    getInitializer,
  };
};

/**
 * Create function that views can use to register an initialization callback
 * that will be called each time switchToView(viewname) is executed
 */
const initStore = makeInitStore();


/**
 * Switch the to view with the given name
 * @param {string} viewName
 */
const switchToView = (viewName, initOptions) => {

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

  //Log details to console
  console.log(`Switching to view ${viewName}`);
  console.log("  -isLoggedIn: ",isLoggedIn());
  if (initOptions) {
    console.log("  -initOptions: ",initOptions);
  }

  hideAllViews();
  //Retrieve and (if extant) run initialization function for the new view
  const initFunction = initStore.getInitializer(viewName);
  if (initFunction) {
    initFunction(initOptions);
  }
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
   * If an ID for a quiz to be attempted is present, render attempt-quiz accordingly.
   * Otherwise start with the home screen (list-quizzes)
   */
  if (typeof attemptQuizId !== 'undefined' && attemptQuizId > 0) {
    switchToView('attempt-quiz', { quiz_id: attemptQuizId });
  } else {
    switchToView('list-quizzes');
  }

});
