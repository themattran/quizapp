/**
 * Keep a reference to name and id for the logged-in user in this global object.
 * After logout, those properties will no longer be defined.
 */
const _currentUser = {};

/**
 * Login user with name userName, and store the name and id in the global _currentUser object.
 * @param {string} userName
 */
const login = (userName) => {
  return $.post('/api/auth/login', { userName })
    .done(data => {
      _currentUser.id = data.userId;
      _currentUser.name = data.userName;
    })
    .fail(err => {
      console.log('Login failed', err);
    });
};

/**
 * Adjust UI according to whether the user is logged in or not
 */
const updateNavUI = () => {

};

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

});
