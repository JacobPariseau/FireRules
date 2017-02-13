(function () {
  'use strict'

  /** Element constants */
  const die = $('#die');
  const ballContainer = $('#ball-container');
  const rulePanel = $('#rule');
  const visibleRulePanel = $('#rule.show');
  const ruleTitle = $('#rule-title');
  const ruleBody = $('#rule-body');
  const rules = $('#settings-rules');
  const challenges = $('#settings-challenges');

  /** Database file */
  let DB;

  $.getJSON('db.json', function (data) {
    DB = data;
  });

  /**
   * Display a new rule from DB
   */
  function newRule() {
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

   let rule;
   // The sample should pull instantly, but there's no need to wait
   if(rules.is(":checked") && challenges.is(":checked")) {
     //User wants all rules
     rule = _.sample(DB.rules);
   } else if (challenges.is(":checked")) {
     //User wants just challenges
     rule = _.sample(_.filter(DB.rules, {type: 'challenge'}));
   } else {
     //User wants status rules
     rule = _.sample(_.filter(DB.rules, {type: 'rule'}));
   }
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
  die.click(newRule);
  rulePanel.click(newRule);
})();
