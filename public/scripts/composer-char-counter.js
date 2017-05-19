$(document).ready(function() {
  var maxLength = 140;
  $("textarea").on("input", function() { // add class to textarea
    var counter = $(this).closest(".new-tweet").find(".counter");
    var length = $(this).val().length;
    var charRemaining = maxLength-length;
    counter.text(charRemaining);
    if (charRemaining < 0) {
      counter.addClass("negChar");
    } else {
      counter.removeClass("negChar");
      $(".errors p").slideUp("fast");
    }
  });
});
