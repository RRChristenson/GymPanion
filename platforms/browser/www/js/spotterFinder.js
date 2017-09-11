var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
navigator.geolocation.getCurrentPosition(onSuccess, error, options);
function onSuccess(pos) {
    var crd = pos.coords;
    var lat = crd.latitude;
    var long = crd.longitude;
    data = {
        "username":localStorage.username,
        "radius":localStorage.spotterRadius,
        "gender":localStorage.gender,
        "latitude":lat,
        "longitude":long
       };
    $.ajax({
        type : "GET",
        url : "http://gympanion.pythonanywhere.com/publishSpotterSearch",
    dataType : 'json',
    data: data,
    success: function(response){
    },
    error : function() {
    navigator.notification.alert("Error finding a nearby spotter");
    }
    });
}
function error(err) {
    navigator.notification.alert("Error getting your location, try again later");
  };

