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
  return $.post('/api/auth/login', { userName }, (data) => {
    if (data.userId) {
      _currentUser.id = data.userId;
      _currentUser.name = data.userName;
    }
  });
};

$(document).ready(function() {

  /**
   * User clicked on "submit" button on the login form: log them in
   */
  $("#login_submit").click(function() {
    const userName = $("#login_user").val();
    if (userName) {
      login(userName)
        .then(user => {
          console.log(`Logged in with username ${user}`);
        });
    }
  });

});
