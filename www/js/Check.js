var checkForm = {
    // Application Constructor
    initialize: function() {
        let button = document.getElementById("goBack");
        //let button = document.getElementById("goBack");
        button.addEventListener("click", this.goToIndex, false);
    },
    goToNext: function()
    {
       window.location = "video.html";

    },
    goToIndex: function()
    {
       window.location = "index.html";
    },

};
