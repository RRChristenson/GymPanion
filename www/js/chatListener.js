$(document).ready(function () {
    if(localStorage.username < localStorage.currentChat)
      {
        var chan = localStorage.username+localStorage.currentChat;
      }
    else
      {
        var chan = localStorage.currentChat+localStorage.username;
      }
    // Initialize the PubNub API connection.
    pubnub = PUBNUB.init({
      subscribe_key: "sub-c-7e42c466-9270-11e7-9c6d-caf7ce3b933f",
      publish_key: "pub-c-e09df898-921f-4220-b126-bc60ceacea5d",
      ssl: true
    });
   
    // Grab references for all of our elements.
    var messageContent = $('#messageContent'),
        sendMessageButton = $('#sendMessageButton'),
        messageList = $('#messageList');
   
    // Handles all the messages coming in from pubnub.subscribe.
    function handleMessage(message) {
        //get channel name based on usernames
        alert(message.text)
        var channelID=message.channel;
        alert(message.channel)
        /*if(localStorage.username < message.username)
            {
                var channelID = localStorage.username+message.username;
            }
        else
            {
                var channelID = message.username+localStorage.username;
            }*/
        if (document.getElementById(channelID)) {
            //if message div exists update the latest message
            currChatDiv = document.getElementById(channelID);
            currChatDiv.innerHTML = message.text;
        }
        else{
            var profilepicURL= getProPic(message.username);
            var newMessage = $("<li class='list-message' >"
            + "<a class='w-clearfix w-inline-block' href='chat.html#channel="+channelID+"&recip="+message.username+"; data-load='1' data-recip="+message.username+"data-channel="+channelID+">"
            + "<div class='w-clearfix column-left'>"
            + "<div class='image-message'><img src="+profilepicURL+">"
            + "</div>"
            + "</div>"
            + "<div class='column-right'>"
            + "<div class='message-title'>"+message.username+"</div>"
            + "<div class='message-text' id="+channelID+">"+message.text+"</div>"
            + "</div>"
            + "</a>"
            + "</li>");
            messageList.append(newMessage);
            //messageList.listview('refresh');
        }
      
    };

    pubnub.publish({
        channel: "admintest",
        message: {
          username: localStorage.username,
          text: "message",
          channel: "admintest"
        }
      }, 
      function (status, response) {
          if (status.error) {
              // handle error
              alert(status);
          } else {
              alert("message Published w/ timetoken", response.timetoken);
          }
      });

    checkChatDatabase();
    

  
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
      navigator.notification.alert("error getting profile picture chat");
    }
    });
  }
  
  function checkChatDatabase(){
    data = {
      "sender":localStorage.username
    };
    $.ajax({
      type : "GET",
      url : "http://192.168.1.3:5000/checkChatDB",
      dataType : 'json',
      data: data,
      success: function(response){
      //for (var channel in response){
      //  var channelName = response[channel];
       // subscribe(channelName);
     // }
     subscribe(response);
    },
    error : function() {
      navigator.notification.alert("error getting profile picture for navigation menu");
    }
    });
  }

  function subscribe(channel){
    // Subscribe to messages coming in from the channel.
    alert("subscribed to:"+channel)
    pubnub.subscribe({
        channels: channel,
        //message: handleMessage
      });

    pubnub.history({
       channel: channel,
       limit: 1
     }, function (messages) {
       messages = messages[0];
       messages = messages || [];
      
       for(var i = 0; i < messages.length; i++) {
         handleMessage(messages[i], false);
       }
      
       //$(document).scrollTop($(document).height());
     });
  }
});