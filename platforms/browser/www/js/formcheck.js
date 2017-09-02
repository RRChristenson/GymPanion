function getRecent(){
    let debug = document.getElementById("debug");
    /*debug.innerHTML="Hellooooooo Test";*/
    $.ajax({
        
               type : "GET",
               url : "http://192.168.1.3:5000/getRecent",
               dataType : 'json',
               /*jsonpCallback : getRecentJsonParse(), // the function to call*/
               success: function(response){
                let div = document.getElementById("FormBg1");
                let debug = document.getElementById("debug");
                debug.innerHTML=response;
                //div.style.backgroundImage = "url('"+response+"')";
               },
               error : function(xhr, ppp,rrr) {
                   alert(xhr+"Errr is occured"+ppp+rrr);
               }
           });

    /*cordovaFetch('http://192.168.1.3:5000/getRecent')
    .then(function(response) {
        let div = document.getElementById("FormBg1");
        let debug = document.getElementById("debug");
        debug.innerHTML="Hellooooooo Test";
        var data = this.responseData.DATA;
        div.style.backgroundImage = "url('"+data+"')";//reponse.json();
      return response.json()*/
};

function getRecentJsonParse(data){
    let div = document.getElementById("FormBg1");
    let debug = document.getElementById("debug");
    debug.innerHTML=data;
//reponse.json();
    /*$.each(json, function(key, value) {
                debug.innerHTML=value;
               div.style.backgroundImage = "url('"+value+"')";
               //tempOpt = '<option value="' + key + '">' + value + '</option>';
               //mylist.append(tempOpt)
               //mylist.selectmenu("refresh");
        
           });*/

};
