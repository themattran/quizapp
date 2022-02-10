//Element representing additional option
const additionalOption = 
  `<div class="modular-option-node">
  <textarea id="new-option" name="option" placeholder="Enter a possible answer"></textarea>
  <fieldset>
    <input type="checkbox" id="correct" name="correct">
    <span>Correct?</span>
 </div>
   `;

//Element representing additional question
const additionalQuestion = 
`<article id="question-option-container">
<textarea id="new-quiz-question" name="question" placeholder="Enter your question" required=""></textarea>
<div id="options-parent">
  <div id="options-target">
  <div class="modular-option-node">
<textarea id="new-option" name="option" placeholder="Enter a possible answer"></textarea>
<fieldset>
  <input type="checkbox" id="correct" name="correct">
  <span>Correct?</span>
</div>
</div>
<button class="nother-option">+ Add an answer</button>
</div>
<div class="button-flex">
<button class="save-button">+ Add next question</button>
</div>
</article>`;

$(document).ready(function() { 
  
  $(document).on('click', '.nother-option', function(e) {
    e.preventDefault();
    $(this).parent().find("#options-target").append(additionalOption);
  })

  $(document).on('click', '.save-button', function(e) {
    e.preventDefault();
    $(this).hide();
    $(this).closest(".questions-container").append(additionalQuestion);
  })
});