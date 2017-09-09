function sendLogin(){
    let user = Document.getElementById("username-field").value;
    let pass = Document.getElementById("password-field").value;

    $.ajax({
        
               type : "POST",
               url : "http://gympanion.pythonanywhere.com/login",
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