if(window.location.hash) {
    hash = window.location.hash
    username = hash.substr(1, hash.indexOf('&')-1);
    var isFeaturedUserClick = false;
    if(hash.indexOf('featured')>0){
        isFeaturedUserClick = true;
    }
    data = {
        "username":username
       };
    $.ajax({
        type : "GET",
        url : "http://fitpanion.com/getProPic",
    dataType : 'json',
    data: data,
    success: function(response){
    $("#mainProPic").attr("src", response.profilePic);
    },
    error : function() {
    navigator.notification.alert("error getting profile picture");
    }
    });
    document.getElementById("name").innerHTML=username;
    data = {
        "username":username
    };
    $.ajax({
        type : "GET",
        url : "http://fitpanion.com/getAllProPics",
    dataType : 'json',
    data: data,
    success: function(response){
      document.getElementById('f1bg').style.backgroundImage="url("+response.img1+")";
      document.getElementById('f2bg').style.backgroundImage="url("+response.img2+")";
      document.getElementById('f3bg').style.backgroundImage="url("+response.img3+")";
      document.getElementById('f4bg').style.backgroundImage="url("+response.img4+")";
      //$("#mainProPic").attr("src", response.profilePic);
    },
    error : function() {
    navigator.notification.alert("error getting profile picture for navigation menu");
    }
    });
    $.ajax({
        
               type : "GET",
               url : "http://fitpanion.com/getProfileData",
               headers: {
                    'Access-Control-Allow-Origin': '*'
                },
               contentType:'application/json; charset=utf-8',
               dataType : 'json',
               data: data,
               success: function(response){
                if(response != "Profile Not Found"){
                    document.getElementById("bio").innerHTML=response.bio;
                    document.getElementById("favlift").innerHTML=response.favoriteLift;
                    document.getElementById("instagram").innerHTML=response.instagram;
                    document.getElementById("yearslifting").innerHTML=response.yearsLifting;
                }
                else{
                
                }
               },
               error : function() {
                   navigator.notification.alert("Invalid Username or Password");
               }
           });
    
    
    if(localStorage.username < username)
        {
            var channel = localStorage.username+username;
        }
    else if(localStorage.username > username)
        {
            var channel = username+localStorage.username;
        }
    var usernameHREF = "chat.html#channel="+channel+"&recip="+username;
    document.getElementById("sendMessage").setAttribute('href',usernameHREF);
    if (username.toLowerCase() == localStorage.username.toLowerCase())
        {
            document.getElementById("sendMessage").style.display="none";
            var editString = "<a href='editProfile.html'><p>Edit Profile</p></a>"
            document.getElementById("name").innerHTML += editString;
            var uploadProPics = "uploadProPics.html#"+localStorage.username+"&";
            document.getElementById("profilePicture").setAttribute('href',uploadProPics);
        }
    else{
            var menuButton = document.getElementById("menu-button");
            $("#menu-wrapper").empty();
            var backButton = $("<div class=\"message-button navbar-button left\""
            +"<div class=\"navbar-button-icon\">"
            +"<div class=\"icon ion-arrow-left-a\" id=\"backIcon\" onclick=\"goBack()\"></div>");
            +"</div>"
            $("#menu-wrapper").append(backButton);
    }
    if(isFeaturedUserClick){
            var menuButton = document.getElementById("menu-button");
            $("#menu-wrapper").empty();
            var backButton = $("<div class=\"message-button navbar-button left\""
            +"<div class=\"navbar-button-icon\">"
            +"<div class=\"icon ion-arrow-left-a\" id=\"backIcon\" onclick=\"goHome()\"></div>");
            +"</div>"
            $("#menu-wrapper").append(backButton);

            function goHome(){
                window.location="home.html";
            }
    }
    function goBack(){
        window.location="nearbyList.html#"+username+"&";
    }
} else {
}

