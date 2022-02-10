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
    switchToView(viewName);
  });
});
