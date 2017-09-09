if(window.location.hash) {
    hash = window.location.hash
    username = hash.substr(1, hash.indexOf('&')-1);
    //localStorage.recip = window.location.hash.substring(hash.indexOf('&')+7,hash.length);
    document.getElementById("name").innerHTML=username;
    data = {
        "username":username
    };
    $.ajax({
        
               type : "GET",
               url : "http://gympanion.pythonanywhere.com/getProfileData",
               headers: {
                    'Access-Control-Allow-Origin': '*'
                },
               contentType:'application/json; charset=utf-8',
               dataType : 'json',
               data: data,
               success: function(response){
                if(response != "Profile Not Found"){
                    document.getElementById("bio").innerHTML=response.bio;
                    //document.getElementById("bio").innerHTML=response.favoriteLift;
                    document.getElementById("youtube").innerHTML=response.youtube;
                    document.getElementById("instagram").innerHTML=response.instagram;
                    //document.getElementById("bio").innerHTML=response.yearsLifting;
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
    if (username == localStorage.username)
        {
            document.getElementById("sendMessage").style.display="none";
            var editString = "<a href='editProfile.html'><p>Edit Profile</p></a>"
            document.getElementById("name").innerHTML += editString;
            var uploadProPics = "uploadProPics.html#"+localStorage.username+"&";
            document.getElementById("profilePicture").setAttribute('href',uploadProPics);
        }
    // hash foun
} else {
    // No hash found
}

