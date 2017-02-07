/** Database file */
const DB = $.getJSON('db.json', function (data) {
  console.log(data);
  return data;
});

/** Element constants */
const die = $('#die');
const rulePanel = $('#rule');
const ruleTitle = $('#rule-title');
const ruleBody = $('#rule-body');

die.on('click', function (e) {
  die.addClass('spin');

  _.delay(function () {
    rulePanel.addClass('show');
  }, 600);

  _.delay(function () {
    die.removeClass('spin');
  }, 1000);

  let rule = _.sample(DB);
  ruleTitle.text(rule.title);
  ruleBody.text(rule.body);

});

$(document).click(function() {
  $('#rule.show').removeClass('show');
});
