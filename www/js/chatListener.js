$(document).ready(function () {

  document.getElementById("message-button").style.display="none";
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
              localStorage.picURL = response.profilePic;
        },
        error : function() {
          navigator.notification.alert("error getting profile picture chat");
        }
        });
        return localStorage.picURL;
      }

    if(localStorage.username < localStorage.currentChat)
      {
        var chan = localStorage.username+localStorage.currentChat;
      }
    else
      {
        var chan = localStorage.currentChat+localStorage.username;
      }
    // Initialize the PubNub API connection.
    /*pubnub = PUBNUB.init({
      subscribe_key: "sub-c-7e42c466-9270-11e7-9c6d-caf7ce3b933f",
      publish_key: "pub-c-e09df898-921f-4220-b126-bc60ceacea5d",
      ssl: true
    });*/
    var pubnub = new PubNub({
      subscribeKey: "sub-c-7e42c466-9270-11e7-9c6d-caf7ce3b933f",
      publishKey: "pub-c-e09df898-921f-4220-b126-bc60ceacea5d",
      ssl: true,
      presenceTimeout: 130
  });
    pubnub.addListener({   
      message: function(m) {
        handleMessage(m.message);
        console.dir(m);
        console.dir(localStorage);
        if(m.timetoken > localStorage.getItem(m.message.channel))
          {
            var channelID=m.message.channel;
            document.getElementById(channelID).innerHTML += "<div class=\"nav-menu-text-right\">  </div>";
          }
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
    function handleMessage(message, recipient) {
        //get channel name based on usernames
        //alert(message.text)
        var channelID=message.channel;
        //alert(message.channel)
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
            var profilepicURL= getProPic(recipient);
            //alert(profilepicURL);
            var newMessage = $("<li class='list-message' >"
            + "<a class='w-clearfix w-inline-block' href='chat.html#channel="+channelID+"&recip="+recipient+"'>"
            + "<div class='w-clearfix column-left'>"
            + "<div class='image-message'><img src="+profilepicURL+">"
            + "</div>"
            + "</div>"
            + "<div class='column-right'>"
            + "<div class='message-title'>"+recipient+"</div>"
            + "<div class='message-text' id="+channelID+">"+message.text+"</div>"
            + "</div>"
            + "</a>"
            + "</li>");
            messageList.append(newMessage);
            //messageList.listview('refresh');
        }
      
    };

    /*pubnub.publish({
        channel: "admintesting5",
        message: {
          username: localStorage.username,
          text: "message",
          channel: "admintesting5"
        }
      }, 
      function (status, response) {
          if (status.error) {
              // handle error
              alert(status);
          } else {
              alert("message Published w/ timetoken to admintesting5");
          }
      });*/

    checkChatDatabase();
  
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
      for (var channel in response){
        var channelName = response[channel];
        //alert(channelName.channelID);
        //localStorage.currRecip=channelName.recipient;
        subscribe(channelName);
        }
     //subscribe(response);
    },
    error : function() {
      navigator.notification.alert("error getting profile picture for navigation menu");
    }
    });
  }

  function subscribe(channel){
    // Subscribe to messages coming in from the channel.
    //alert("subscribed to:"+channel.channelID)
    pubnub.subscribe({
      channels: [channel.channelID]
    });
    pubnub.history({
      channel: channel.channelID,
      reverse: false,
      count: 1
    }, function (response,messages) {
      //console.dir(messages.messages);
      message = messages.messages[0];
      message = messages.messages || [];
      for(var i = 0; i < message.length; i++) {
        handleMessage(message[i].entry, channel.recipient, false);
        var latestTokenForCurrChat = localStorage.getItem(channel.channelID);
        console.dir(message[i]);
        if(message[i].timetoken > latestTokenForCurrChat)
          {
            var channelID=message[i].entry.channel;
            document.getElementById(channelID).innerHTML += "<div class=\"nav-menu-text-right\">  </div>";
          }
      }
    });
  }
});