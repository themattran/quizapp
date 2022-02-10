/**
 * Keep a reference to name and id for the logged-in user in this global object.
 * After logout, those properties will no longer be defined.
 */
const _currentUser = {};

/**
 * Convenience function to determine whether the session is logged in
 * @returns boolean, whether or not the session is signed in
 */
const isLoggedIn = () => _currentUser.id > 0;

/**
 * Adjust UI according to whether the user is logged in or not
 */
 const updateNavUI = () => {
  if (_currentUser.id) {
    $("#nav_login").text(`Sign Out (${_currentUser.name})`);
  } else {
    $("#nav_login").text("Sign In");
  }
};

/**
 * Login user with name userName, and store the name and id in the global _currentUser object.
 * @param {string} userName
 * @returns a promise to the login confirmation and user record
 */
const login = (userName) => {
  return $.post('/api/auth/login', { userName })
    .done(data => {
      _currentUser.id = data.userId;
      _currentUser.name = data.userName;
      console.log(`Logging in`, data);
    })
    .fail(err => {
      console.log(`Login failed`, err);
    });
};

/**
 * Logout current user
 * @returns a promise to the logout confirmation
 */
const logout = () => {
  return $.get('/api/auth/logout')
    .done(data => {
      console.log(`Logging out`, data);
      _currentUser.id = undefined;
      _currentUser.name = undefined;
      updateNavUI();
    });
};

/**
 * Get the state of the session from the server (on page load)
 */
const pullSessionState = () => {
  return $.get('/api/auth/state')
    .done(data => {
      if (data.id) {
        _currentUser.id = data.id;
        _currentUser.name = data.name;
      }
    });
}

$(document).ready(function() {

  /**
   * User clicked on "submit" button on the login form: log them in
   */
  $("#login_submit").click(function() {
    const userName = $("#login_user").val();
    if (userName) {
      login(userName)
        .then(() => {
          updateNavUI();
          //Direct user to the my-quizzes view after login
          switchToView("my-quizzes");
        });
    }
  });

  /**
   * On page load, pull the session state and adjust UI according to whether user is logged in
   */
  pullSessionState()
    .then(() => {
      updateNavUI();
    });

});
