function renderTweets(tweets) {
  var $tweetContainer = $('.tweets');
  $tweetContainer.empty();
  for (var ii = 0; ii < tweets.length; ii++) {
    let tweet = tweets[ii];
    $tweetContainer.prepend(createTweetElement(tweet));
  }
}

function createTweetElement(tweet) {
  const html = `
  <article>
    <header>
      <img class='logo' src="${tweet.user.avatars.small}">
      <h2 class='full-name'>${escape(tweet.user.name)}</h2>
      <h4 class='user-handle'>${escape(tweet.user.handle)}</h4>
    </header>
      <p class='content'>${escape(tweet.content.text)};</p>
    <footer>
      <p class='date-stamp'>${new Date(tweet.created_at)}</p>
    </footer>
  </article>
  `
  // ${escape()};
  // ${escape(textFromUser)}`);
  return html;
}

//  new tweet function here

$('form').on('submit', function(evt) {
  evt.preventDefault();
  let content = $('textarea').val();
    if (content.length === 0) {
      console.log("you cannot publish an empty tweet");
    } else if (content.length > 140) {
      console.log("your tweet is too long.");
    } else {
      var formStuff = $(this).serialize();
      createNewTweet(formStuff);
      $('textarea').val('');
    }

});

function loadTweets() {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    dataType: 'json',
    success: renderTweets
  });
}

loadTweets();

function createNewTweet(data) {
  $.ajax({
    url: '/tweets',
    data: data,
    method: 'POST',
    success: loadTweets
  });
}

// jquery hide/show

$('.new-tweet').hide();

$('button').click(function(){
  $('.new-tweet').slideToggle();
  $('textarea').focus();
});

$('input').on('click', function(){
$('.counter').text('140');
});

// escape function

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// function timeSince(date) {

//   var seconds = Math.floor((new Date() - date) / 1000);

//   var interval = Math.floor(seconds / 31536000);

//   if (interval > 1) {
//     return interval + " years";
//   }
//   interval = Math.floor(seconds / 2592000);
//   if (interval > 1) {
//     return interval + " months";
//   }
//   interval = Math.floor(seconds / 86400);
//   if (interval > 1) {
//     return interval + " days";
//   }
//   interval = Math.floor(seconds / 3600);
//   if (interval > 1) {
//     return interval + " hours";
//   }
//   interval = Math.floor(seconds / 60);
//   if (interval > 1) {
//     return interval + " minutes";
//   }
//   return Math.floor(seconds) + " seconds";
// }
// var aDay = 24*60*60*1000
// console.log(timeSince(new Date(Date.now()-aDay)));
// console.log(timeSince(new Date(Date.now()-aDay*2)));


