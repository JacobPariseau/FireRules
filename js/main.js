$('#die').on('click', function (e) {
  const die = $(this);
  die.addClass('spin');

  _.delay(function () {
    $('#rule').addClass('show');
  }, 600);

  _.delay(function () {
    die.removeClass('spin');
  }, 1000);
});

$(document).click(function() {
  $('#rule.show').removeClass('show');
});
