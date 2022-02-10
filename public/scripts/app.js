// Client facing scripts here

let additionalOption = 
  `<div class="modular-option-node">
    <textarea id="new-option" name="option" placeholder="Enter a possible answer"></textarea>
      <fieldset>
      <input type="checkbox" id="correct" name="correct">
      <span>Correct?</span>
     </fieldset>
   </div>`;

$(document).ready(function() { 
  $(".nother-question").click(function(e) {
    e.preventDefault();
    $(".options-container").append(additionalOption);
  })
});

