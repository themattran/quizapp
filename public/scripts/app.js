// Client facing scripts here



// Copy text to clipboard
const copyText = function(text) {
  navigator.clipboard.writeText(text)
    .then(() => {
      console.log("Copied to clipboard: ",text);
    })
    .catch(err => {
      console.log('Something went wrong', err);
    });
};
