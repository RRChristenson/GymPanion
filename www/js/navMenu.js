document.write('\
<script type="text/javascript" src="js/jquery.min.js"></script>\
<script type="text/javascript" src="js/backgroundChat.js"></script>\
<div class="w-nav navbar" data-collapse="all" data-animation="over-left" data-duration="400" data-contain="1" data-easing="ease-out-quint" data-no-scroll="1">\
<p class="navbar-title-test">FitPanion</p>\
<div class="w-container">\
<nav class="w-nav-menu nav-menu bg-gradient" role="navigation">\
    <div class="nav-menu-header">\
    <div class="profile-menu">\
    <img class="img-circle" id="menuProPic" src="images/pic3.jpeg" alt=" ">\
      <h3 id="username">Rob Christenson</h3>\
      </div>\
    </div>\
    <a class="w-clearfix w-inline-block nav-menu-link" href="home.html" data-load="1">\
      <div class="icon-list-menu">\
        <div class="icon ion-home"></div>\
      </div>\
      <div class="nav-menu-titles">Home</div>\
    </a>\
    <a class="w-clearfix w-inline-block nav-menu-link" href="workoutTracker.html" data-load="1">\
    <div class="icon-list-menu">\
      <div class="icon ion-compose"></div>\
    </div>\
    <div class="nav-menu-titles">Workout Tracker</div>\
  </a>\
    <a class="w-clearfix w-inline-block nav-menu-link" href="profile.html#'+localStorage.username+'&" data-load="1">\
    <div class="icon-list-menu">\
      <div class="icon ion-ios-contact-outline"></div>\
    </div>\
      <div class="nav-menu-titles">My Profile</div>\
  </a>\
  <a class="w-clearfix w-inline-block nav-menu-link" href="spotter.html" data-load="1">\
  <div class="icon-list-menu">\
     <div class="icon ion-ios-eye"></div>\
  </div>\
  <div class="nav-menu-titles">Find a gym partner</div>\
  </a>\
    <a class="w-clearfix w-inline-block nav-menu-link" href="gymFinder.html" data-load="1">\
      <div class="icon-list-menu">\
        <div class="icon ion-ios-location"></div>\
      </div>\
      <div class="nav-menu-titles">Gym Finder</div>\
    </a>\
    <a class="w-clearfix w-inline-block nav-menu-link" href="531.html" data-load="1">\
      <div class="icon-list-menu">\
        <div class="icon ion-ios-pulse-strong"></div>\
      </div>\
        <div class="nav-menu-titles">Get a Routine</div>\
    </a>\
    <a class="w-clearfix w-inline-block nav-menu-link" href="logout.html" data-load="1">\
    <div class="icon-list-menu">\
      <div class="icon ion-ios-arrow-back"></div>\
    </div>\
      <div class="nav-menu-titles">Logout</div>\
  </a>\
    <div class="separator-bottom"></div>\
    <div class="separator-bottom"></div>\
    <div class="separator-bottom"></div>\
  </nav>\
<div id="menu-wrapper">\
<div class="wrapper-mask" data-ix="menu-mask"></div>\
<div class="w-nav-button navbar-button left" id="menu-button" data-ix="hide-navbar-icons">\
<div class="navbar-button-icon home-icon">\
  <div class="bar-home-icon top"></div>\
  <div class="bar-home-icon middle"></div>\
  <div class="bar-home-icon bottom"></div>\
</div>\
</div>\
</div>\
<div class="message-button navbar-button right" id="message-button" >\
<div class="navbar-button-icon">\
  <div class="icon ion-email" id="emailIcon" onclick="loadChat()"></div>\
</div>\
</div>\
</nav>\
</div>\
</div>\
<script type="text/javascript">\
document.getElementById("username").innerHTML=localStorage.username;\
data = {\
                  "username":localStorage.username\
                 };\
$.ajax({\
       type : "GET",\
       url : "http://fitpanion.com/getProPic",\
       dataType : \'json\',\
       data: data,\
       success: function(response){\
        $("#menuProPic").attr("src", response.profilePic);\
  },\
       error : function() {\
           navigator.notification.alert("error getting profile picture for navigation menu");\
       }\
   });\
</script>\
<script type="text/javascript">\
function loadChat(){\
   window.location="messages.html";\
}\
</script>\
<script src="js/pubnub.js"></script>\
');