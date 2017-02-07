(function () {
  'use strict'

  /** Element constants */
  const die = $('#die');
  const rulePanel = $('#rule');
  const visibleRulePanel = $('#rule.show');
  const ruleTitle = $('#rule-title');
  const ruleBody = $('#rule-body');

  /** Database file */
  let DB;

  $.getJSON('db.json', function (data) {
    DB = data;
  });

  /**
   * Display a new rule from DB
   */
  function newRule() {
   die.addClass('spin');
   rulePanel.removeClass('show');

   // The sample should pull instantly, but there's no need to wait
   let rule = _.sample(DB.rules);
   // Waiting 400ms gives time for the old panel to disappear
   _.delay(function () {
     ruleTitle.text(rule.title);
     ruleBody.text(rule.body);
   }, 400);

   //Waiting 600ms causes the panel to finish appearing by the time spinner stops
   _.delay(function () {
     rulePanel.addClass('show');
   }, 600);

   //Waiting 1000ms lets the spinner complete its animation
   _.delay(function () {
     die.removeClass('spin');
   }, 1000);
  }

  /** Call newRule on click */
  $(document).click(newRule);
})();
