Template.homepage.onCreated(function() {



});


Template.homepage.events({
  'click #postButton': function() {

    tweet = $('#inputPost').val();

    console.log(tweet);

    Tweets.insert({
      messaggio: tweet,
      data: new Date()
    });

  }
});

Template.homepage.helpers({
  allTweets: function() {
    return Tweets.find({ }, {
        sort: {
          data: -1
        }
    });
  }
})
