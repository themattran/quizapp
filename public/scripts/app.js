// Client facing scripts here

const additionalOption = 
  `<div class="modular-option-node">
    <textarea id="new-option" name="option" placeholder="Enter a possible answer"></textarea>
      <fieldset>
      <input type="checkbox" id="correct" name="correct">
      <span>Correct?</span>
     </fieldset>
   </div>`;

const additionalQuestion = 
`<article id="question-option-container" margin-top:10px>
<textarea id="new-quiz-question" name="question" placeholder="Enter your question" required=""></textarea>
<div class="options-container">
  <div class="modular-option-node">
<textarea id="new-option" name="option" placeholder="Enter a possible answer"></textarea>
<fieldset>
  <input type="checkbox" id="correct" name="correct">
  <span>Correct?</span>
</fieldset>
</div>
</div>
<button class="nother-question">+</button>
<div class="button-flex">
<button class="save-button">+ Add next question</button>
</div>
</article>`;

$(document).ready(function() { 
  $(".nother-question").click(function(e) {
    e.preventDefault();
    $(".options-container").append(additionalOption);
  })

  $(".save-button").click(function(e) {
    e.preventDefault();
    $(this).hide();
    $(".questions-container").append(additionalQuestion);
  })
});

