var login = {
    // Application Constructor
    initialize: function() {
        let button = document.getElementById("logIn");
        button.addEventListener("click", this.goToHome, false);
        
    },
    goToHome: function()
    {
       window.location = "home.html";

    },

};