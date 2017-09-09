$(document).ready(function () {
  function addChatToDB(){
    data = {
      "channel":localStorage.chan,
      "sender":localStorage.username,
      "recipient":localStorage.recip
    };
    $.ajax({
      type : "GET",
      url : "http://gympanion.pythonanywhere.com/newChat",
      dataType : 'json',
      data: data,
      success: function(){}
    });
  }

  /*function publishLatestTimetoken(channel,user,timetoken){
    
    data = {
      "channel":channel,
      "user":user,
      "timetoken":timetoken
    };
    $.ajax({
      type : "GET",
      url : "http://192.168.1.3:5000/publishTimeToken",
      dataType : 'json',
      data: data,
      success: function(response){
          
    },
    error : function() {
      //navigator.notification.alert("error getting profile picture chat");
    }
    });
  }*/

  if(window.location.hash) {
    hash = window.location.hash
    localStorage.chan = hash.substr(9, hash.indexOf('&')-9);
    localStorage.recip = window.location.hash.substring(hash.indexOf('&')+7,hash.length);
    document.getElementById('chatTitle').innerHTML="Chat with "+localStorage.recip;
    // hash found
} else {
    // No hash found
}
  // Initialize the PubNub API connection.
  var pubnub = new PubNub({
    subscribeKey: "sub-c-7e42c466-9270-11e7-9c6d-caf7ce3b933f",
    publishKey: "pub-c-e09df898-921f-4220-b126-bc60ceacea5d",
    ssl: true,
    presenceTimeout: 130
});
  pubnub.addListener({   
    message: function(m) {
      localStorage.latestTimeToken = m.timetoken;
      localStorage.setItem(m.message.channel,m.timetoken);
      //publishLatestTimetoken(localStorage.chan,localStorage.username,m.timetoken)
      handleMessage(m.message);
    },
    presence: function(p) {

    },
    status: function(s) {
    }
});
  // Grab references for all of our elements.
  var messageContent = $('#messageContent'),
      sendMessageButton = $('#sendMessageButton'),
      messageList = $('#messageList');
 
  // Handles all the messages coming in from pubnub.subscribe.
  function handleMessage(message, history) {
    if(message.username == localStorage.username)
      {
        var messageEll = $("<li class='list-chat right'>"
        + "<div class='w-clearfix column-right chat right'>"
        +  "<div class='arrow-globe right'></div>"
        +  "<div class='chat-text right'>"+message.text+"</div>"
        +  "</div>"
        +  "</li>");
      }
    else if(message.username != localStorage.username)
      {
        var profilepicURL= getProPic(message.username);
        //alert(profilepicURL);
        var messageEll = $("<li class='w-clearfix list-chat'>"
        + "<div class='column-left chat'>"
        + "<a href='profile.html#"+message.username+"&'>"
        + "<div class='image-message chat'><img src="+profilepicURL+">"
        + "</div>"
        + "</a>"
        + "</div>"
        + "<div class='w-clearfix column-right chat'>"
        + "<div class='arrow-globe'></div>"
        +  "<div class='chat-text'>"+message.text+"</div>"
        + "</div>"
        + "</li>");
      }
    messageList.append(messageEll);
 
    if(history)
      {
        $('html, body').scrollTop( $(document).height() );
      }
    else{
      $("html, body").animate({ scrollTop: $(document).height() - $(window).height() }, 'slow');
    }

  };
 
  // Compose and send a message when the user clicks our send message button.
  sendMessageButton.click(function (event) {
    addChatToDB();
    data = {
      "channel":localStorage.chan,
      "sender":localStorage.username,
      "recipient":localStorage.recip
    };
    $.ajax({
      type : "GET",
      url : "http://gympanion.pythonanywhere.com/newChat",
      dataType : 'json',
      data: data,
      success: function(){}
    });
    var message = messageContent.val();
    //alert("message sent to "+localStorage.chan);
    if (message != '') {
      pubnub.publish({
        channel: localStorage.chan,
        message: {
          username: localStorage.username,
          text: message,
          channel:localStorage.chan
        }
      }, 
      function (status, response) {
          if (status.error) {
              // handle error
              //alert("error"+status.error);
          } else {
            //alert("message Published w/ timetoken");
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
    channels: [localStorage.chan]
  });
  pubnub.history({
    channel: localStorage.chan,
    reverse: false,
    count: 5
  }, function (response,messages) {
    console.dir(messages.messages);
    message = messages.messages[0];
    message = messages.messages || [];
    for(var i = 0; i < message.length; i++) {
      handleMessage(message[i].entry, true, false);
      localStorage.setItem(message[i].entry.channel,message[i].timetoken);
      localStorage.latestTimeToken = message[i].timetoken;
    }
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
      localStorage.profilepic = response.profilePic;
  },
  error : function() {
    navigator.notification.alert("error getting profile picture for navigation menu");
  }
  });
  return localStorage.profilepic;
}