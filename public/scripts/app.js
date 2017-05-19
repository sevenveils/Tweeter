$(function () {
  var $tweetContainer = $(".tweets");

  function renderTweets(tweets) {
    $tweetContainer.empty();
    for (var ii = 0; ii < tweets.length; ii++) {
      let tweet = tweets[ii];
      $tweetContainer.prepend(createTweetElement(tweet));
    }
  }

  function createTweetElement(tweet) {
    var html = `
    <article class="tweet">
      <header>
        <img class="logo" src="${tweet.user.avatars.small}">
        <h2 class="full-name">${escape(tweet.user.name)}</h2>
        <h4 class="user-handle">${escape(tweet.user.handle)}</h4>
      </header>
        <p class="content">${escape(tweet.content.text)}</p>
      <footer>
        <img class="icon" src='images/heart.png'>
        <img class="icon" src='images/retweet.png'>
        <img class="icon" src='images/flag.png'>
        <p class="date-stamp">${moment(tweet.created_at).startOf("hour").fromNow()}</p>
      </footer>
    </article>
    `
    return html;
  }

  $("form").on("submit", function(evt) {
    evt.preventDefault();
    let content = $("textarea").val();
    if (content.length === 0) {
      $("#empty-tweet").slideDown("fast");
    } else if (content.length > 140) {
      $("#excessive-tweet").slideDown("fast");
    } else {
      var formStuff = $(this).serialize();
      createNewTweet(formStuff);
    }
  });

  function loadTweets() {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: renderTweets
    });
  }

  loadTweets();

  function createNewTweet(data) {
    $.ajax({
      url: "/tweets",
      data: data,
      method: "POST",
      success: function(data) {
        loadTweets();
        $("textarea").val('');
        $(".counter").text("140");
      }
    });
  }

  // jquery hide/show
  $("button").click(function(){ // add class to button and make it more specific
    $(".new-tweet").slideToggle();
    $("textarea").focus();
  });

  // escape function
  function escape(str) {
    var div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
});
