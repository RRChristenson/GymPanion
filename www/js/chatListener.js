$(document).ready(function () {
  var m_newChats={};
  // Grab references for all of our elements.
  var messageContent = $('#messageContent'),
  sendMessageButton = $('#sendMessageButton'),
  messageList = $('#messageList');

  document.getElementById("message-button").style.display="none";

    function CreateNewMessageDiv(message,user){
        data = {
          "username":user
        };
        $.ajax({
          type : "GET",
          url : "http://fitpanion.com/getProPic",
          dataType : 'json',
          data: data,
          success: function(response){
            var addNewMsgIndicator = false;
            for (var channelID in m_newChats){
              if(channelID == message.channel)
              {
                addNewMsgIndicator = true;
              }
            }
            if(addNewMsgIndicator){
              var newMessage = $("<li class='list-message'>"
              + "<a class='w-clearfix w-inline-block' href='chat.html#channel="+message.channel+"&recip="+user+"'>"
              + "<div class='w-clearfix column-left'>"
              + "<div class='image-message'><img src="+response.profilePic+">"
              + "</div>"
              + "</div>"
              + "<div class='column-right'>"
              + "<div class='message-title'>"+user+"</div>"
              + "<div class='message-text' id="+message.channel+">"+message.text+"</div>"
              + "<div class=\"nav-menu-text-right\">  </div>"
              + "</div>"
              + "</a>"
              + "</li>");

            }
            else{
              var newMessage = $("<li class='list-message'>"
              + "<a class='w-clearfix w-inline-block' href='chat.html#channel="+message.channel+"&recip="+user+"'>"
              + "<div class='w-clearfix column-left'>"
              + "<div class='image-message'><img src="+response.profilePic+">"
              + "</div>"
              + "</div>"
              + "<div class='column-right'>"
              + "<div class='message-title'>"+user+"</div>"
              + "<div class='message-text' id="+message.channel+">"+message.text+"</div>"
              + "</div>"
              + "</a>"
              + "</li>");
            }

            messageList.append(newMessage);
        },
        error : function() {
          navigator.notification.alert("error getting profile picture chat");
        }
        });
        //checkForNewChat();
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
    var pubnub = new PubNub({
      subscribeKey: "sub-c-7e42c466-9270-11e7-9c6d-caf7ce3b933f",
      publishKey: "pub-c-e09df898-921f-4220-b126-bc60ceacea5d",
      ssl: true,
      presenceTimeout: 130
  });
    pubnub.addListener({   
      message: function(m) {
        
        console.dir(m);
        console.dir(localStorage);
        if(m.timetoken > localStorage.getItem(m.message.channel))
          {
            var channelID=m.message.channel;
            m_newChats[channelID] = channelID;
            localStorage.setItem(m.message.channel,m.timetoken);
          }
          handleMessage(m.message);
      },
      presence: function(p) {
  
      },
      status: function(s) {
      }
  });
   
    // Handles all the messages coming in from pubnub.subscribe.
    function handleMessage(message, recipient) {
        //get channel name based on usernames
        //alert(message.text)
        var channelID=message.channel;
        if (document.getElementById(channelID)) {
            //if message div exists update the latest message
            currChatDiv = document.getElementById(channelID);
            currChatDiv.innerHTML = message.text;
        }
        else{
            CreateNewMessageDiv(message, recipient);
        }
      
    };


    checkChatDatabase();
  
  function checkChatDatabase(){
    data = {
      "sender":localStorage.username,
      "authToken":localStorage.authToken
    };
    $.ajax({
      type : "GET",
      url : "http://fitpanion.com/checkChatDB",
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
        
        var latestTokenForCurrChat = localStorage.getItem(channel.channelID);
        console.log("last token = "+latestTokenForCurrChat);
        console.log("curr token = "+message[i].timetoken);
        if(message[i].timetoken > latestTokenForCurrChat)
          {
            var channelID=message[i].entry.channel;
            m_newChats[channelID] = channelID;            
            //document.getElementById(channelID).innerHTML += "<div class=\"nav-menu-text-right\">  </div>";
          }
        handleMessage(message[i].entry, channel.recipient, false);
      }
    });
  }
});