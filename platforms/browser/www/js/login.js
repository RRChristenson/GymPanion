function sendLogin(){
    let user = Document.getElementById("username-field").value;
    let pass = Document.getElementById("password-field").value;

    $.ajax({
        
               type : "POST",
               url : "http://192.168.1.3:5000/login",
               dataType : 'json',
               username: user,
               password: pass,
               success: function(response){               
               },
               error : function(xhr) {
                   alert(xhr[1]);
               }
           });
}