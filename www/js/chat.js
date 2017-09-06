$(document).ready(function () {
  alert("inready");
  alert(window.location.hash);
  if(window.location.hash) {
    hash = window.location.hash
    var chan= hash.substr(9, hash.indexOf('&')-9);
    var recip = window.location.hash.substring(hash.indexOf('&')+7,hash.length);
    document.getElementById('chatTitle').innerHTML="Chat with "+recip;
    //alert(recip);
    //alert(chan);
    // hash found
} else {
    // No hash found
}
  /*if(localStorage.username < localStorage.currentChat)
    {
      var chan = localStorage.username+localStorage.currentChat;
    }
  else
    {
      var chan = localStorage.currentChat+localStorage.username;
    }*/
  // Initialize the PubNub API connection.
  var pubnub = PUBNUB.init({
    subscribe_key: "pub-c-e09df898-921f-4220-b126-bc60ceacea5d",
    publish_key: "sub-c-7e42c466-9270-11e7-9c6d-caf7ce3b933f",
    ssl: true
  });
 
  // Grab references for all of our elements.
  var messageContent = $('#messageContent'),
      sendMessageButton = $('#sendMessageButton'),
      messageList = $('#messageList');
 
  // Handles all the messages coming in from pubnub.subscribe.
  function handleMessage(message) {
    if(message.username == localStorage.username)
      {
        var messageEll = $("<li class='list-chat right' data-ix='list-item'>"
        + "<div class='w-clearfix column-right chat right'>"
        +  "<div class='arrow-globe right'></div>"
        +  "<div class='chat-text right'>"+message.text+"</div>"
        +  "</div>"
        +  "</li>");
      }
    else if(message.username != localStorage.username)
      {
        var profilepicURL= getProPic(message.username);
        var messageEll = $("<li class='w-clearfix list-chat' data-ix='list-item'>"
        + "<div class='column-left chat'>"
        + "<div class='image-message chat'><img src="+profilepicURL+">"
        + "</div>"
        + "</div>"
        + "<div class='w-clearfix column-right chat'>"
        + "<div class='arrow-globe'></div>"
        +  "<div class='chat-text'>"+message.text+"</div>"
        + "</div>"
        + "</li>");
      }
    messageList.append(messageEll);
    //messageList.listview('refresh');
 
    // Scroll to bottom of page
    $("html, body").animate({ scrollTop: $(document).height() - $(window).height() }, 'slow');
  };
 
  // Compose and send a message when the user clicks our send message button.
  sendMessageButton.click(function (event) {
    var message = messageContent.val();

    if (message != '') {
      pubnub.publish({
        channel: chan,
        message: {
          username: localStorage.username,
          text: message,
          channel:chan
        }
      });
 
      messageContent.val("");
    }
  });
 
  // Also send a message when the user hits the enter button in the text area.
  messageContent.bind('keydown', function (event) {
    if((event.keyCode || event.charCode) !== 13) return true;
    sendMessageButton.click();
    return false;
  });
 
  // Subscribe to messages coming in from the channel.
  pubnub.subscribe({
    channels: chan
  });

  pubnub.history({
    channel: chan,
    limit: 100
  }, function (messages) {
    messages = messages[0];
    messages = messages || [];
  
    for(var i = 0; i < messages.length; i++) {
      handleMessage(messages[i], false);
    }
  
    //$(document).scrollTop($(document).height());
  });
});

function getProPic(user){
  data = {
    "username":user
  };
  $.ajax({
    type : "GET",
    url : "http://gympanion.pythonanywhere.com/getProPic",
    dataType : 'json',
    data: data,
    success: function(response){
    for (var key in response){
      var attrName = key;
      var attrValue = response[key];
      return attrValue;
    }
  },
  error : function() {
    navigator.notification.alert("error getting profile picture for navigation menu");
  }
  });
}