(function () {
  'use strict'

  /** Element constants */
  const die = $('#die');
  const ballContainer = $('#ball-container');
  const rulePanel = $('#rule');
  const visibleRulePanel = $('#rule.show');
  const ruleTitle = $('#rule-title');
  const ruleBody = $('#rule-body');
  const ruleButton = $('#rule-button');
  const challengeButton = $('#challenge-button');

  /** Database file */
  let DB;

  $.getJSON('db.json', function (data) {
    DB = data;
  });

  /**
   * Display a new rule from DB
   */
  function newRule(filter) {
    if(die.hasClass('spin')) {
      die.removeClass('spin');
      _.delay(function () {
        die.addClass('spin');
      }, 50);
    } else {
      die.addClass('spin');

    }

   ballContainer.removeClass('grow');
   rulePanel.removeClass('show');

   // The sample should pull instantly, but there's no need to wait
   let rule = _.sample(_.filter(DB.rules, filter));

   // Waiting 400ms gives time for the old panel to disappear
   _.delay(function () {
     ballContainer.addClass('grow');
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
   }, 2000);
  }

  /** Call newRule on click */
  die.click( function () { newRule({}); });
  ruleButton.click( function () { newRule({type: 'rule'}); });
  challengeButton.click( function () { newRule({type: 'challenge'}); });
  
})();
