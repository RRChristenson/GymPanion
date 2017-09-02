$.ajax({
    
           type : "GET",
           url : "http://gympanion.pythonanywhere.com/getRecentFormChecks",
           dataType : 'json',
           success: function(response){
            let debug = document.getElementById("debug");
            //debug.innerHTML=response["Rob"];
            var i = 1;
                for (var key in response){
                    let div = document.getElementById("FormBg"+i);
                    var attrName = key;
                    var attrValue = response[key];
                    div.style.backgroundImage = "url('"+attrValue+"')";
                    div.addEventListener("click", goToFormCheck(attrName), false);
                    i++;
                }
        
            
            //div.style.backgroundImage = "url('"+response+"')";

            //debug.innerHTML=response.data;
            
           },
           error : function(xhr, ppp,rrr) {
               alert(xhr+"Errr is occured"+ppp+rrr);
           }
       });

function goToFormCheck(attrName){

};
