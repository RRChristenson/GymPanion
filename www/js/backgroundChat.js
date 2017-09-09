$.getScript("http://cdn.pubnub.com/pubnub-3.4.4.js", function(){    
var pubnub = new PubNub({
    subscribeKey: "sub-c-7e42c466-9270-11e7-9c6d-caf7ce3b933f",
    publishKey: "pub-c-e09df898-921f-4220-b126-bc60ceacea5d",
    ssl: true,
    presenceTimeout: 130
});
  pubnub.addListener({   
    message: function(m) {
      //handleMessage(m.message);
      if(m.timetoken  > localStorage.latestTimeToken)
        {
            var div = document.getElementById("emailIcon");
            if(div.classList.contains('ion-email')){
                document.getElementById("emailIcon").classList.remove('ion-email');
            }
            document.getElementById("emailIcon").classList.add('ion-email-unread');
        }
      else{
            var div = document.getElementById("emailIcon");
            document.getElementById("emailIcon").classList.add('ion-email');
            if(div.classList.contains('ion-email-unread')){
                document.getElementById("emailIcon").classList.remove('ion-email-unread');
            }
            
        }
    },
    presence: function(p) {

    },
    status: function(s) {
    }
});
 
  // Grab references for all of our elements.
  //var messageContent = $('#messageContent'),
  //    sendMessageButton = $('#sendMessageButton'),
  //    messageList = $('#messageList');
 
  // Keeping this function for push notifications in future
  /*function handleMessage(message, recipient) {
      var channelID=message.channel;

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
    
  };*/

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
      localStorage.newMessage = false;
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
  pubnub.subscribe({
    channels: [channel.channelID]
  });
  pubnub.history({
    channel: channel.channelID,
    reverse: false,
    count: 1
  }, function (response,messages) {
    message = messages.messages[0];
    message = messages.messages || [];
    for(var i = 0; i < message.length; i++) {
      //handleMessage(message[i].entry, channel.recipient, false);
      var latestTokenForCurrChat = localStorage.latestTimeToken;
      if(message[i].timetoken > latestTokenForCurrChat)
        {
            var div = document.getElementById("emailIcon");
            if(div.classList.contains('ion-email')){
                document.getElementById("emailIcon").classList.remove('ion-email');
            }
            document.getElementById("emailIcon").classList.add('ion-email-unread');
            localStorage.newMessage = true;
            //console.dir(localStorage.newMessage)
        }
      else{
          if(localStorage.newMessage == false){
            var div = document.getElementById("emailIcon");
            document.getElementById("emailIcon").classList.add('ion-email');
            if(div.classList.contains('ion-email-unread')){
                document.getElementById("emailIcon").classList.remove('ion-email-unread');
            }
          }   
        }
    }
  });
}
});