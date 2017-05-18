$(document).ready(function() {
  var maxLength = 140;
  $('textarea').on('input', function() {
    var length = $(this).val().length;
    var charRemaining = maxLength-length;
    $(this).parent().find('.counter').text(charRemaining);
      if (charRemaining <= 0) {
        $(this).parent().find('.counter').addClass('negChar');
      } else {
        $(this).parent().find('.counter').removeClass('negChar');
      }
  });
});
