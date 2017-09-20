var CurrExercise;

function addSwipes(items) {
    // Swipe to remove list item
    //alert("adding swipe");
    var routines = $(items);//"#RoutineList li"
    routines.each(function(i, li) {
        var routine = $(li);
        var name = $(li).find('.exercise-title').text();
        var temp = document.getElementById(routine.attr('id'));
        var mc = new Hammer.Manager(temp, {
            recognizers: [
                [Hammer.Swipe,{ direction: Hammer.DIRECTION_HORIZONTAL }],
            ]
        });
        mc.on("swipe", function(ev) {
            if(ev.direction == Hammer.DIRECTION_LEFT){                
                routine.addClass("lefttransition")
                .on( "webkitTransitionEnd transitionend otransitionend", function() {
                //console.dir(routine);//deleteExercise(routine,name);
                });
                //routine.remove();
                //CurrExercise = routine;
               // deleteExercise(routine,name);
                
            }
            else if(ev.direction == Hammer.DIRECTION_RIGHT){
                routine.removeClass("lefttransition");
                //routine.addClass("rightransition");
            }
        });
        function deleteExercise(Divname,name){
            navigator.notification.confirm(
                'Are you sure you want to delete '+name+'?',  // message
                confirmCallback,                  // callback to invoke
                'Delete Routine',            // title
                ['Yes','No']   );           // buttonLabels

            function confirmCallback(promptCallback){
                if(promptCallback.buttonIndex == 1){Divname.remove();}
                else {
                    Divname.removeClass("lefttransition");
                }
            }

        };
    });
};




function confirmAndDelete( listitem) {
        // Highlight the list item that will be removed
        //listitem.children( ".ui-btn" ).addClass( "ui-btn-active" );
        // Inject topic in confirmation popup after removing any previous injected topics
        //$( "#confirm .topic" ).remove();
        //listitem.find( ".topic" ).clone().insertAfter( "#question" );
        // Show the confirmation popup
        //$( "#confirm" ).popup( "open" );
        // Proceed when the user confirms
        //$( "#confirm #yes" ).on( "click", function() {
            // Remove with a transition
        listitem.addClass("lefttransition");
}
        /*    if ( transition ) {
                listitem
                    // Add the class for the transition direction
                    .addClass( transition )
                    // When the transition is done...
                    .on( "webkitTransitionEnd transitionend otransitionend", function() {
                        // ...the list item will be removed
                        listitem.remove();
                        // ...the list will be refreshed and the temporary class for border styling removed
                        $( "#list" ).listview( "refresh" ).find( ".border-bottom" ).removeClass( "border-bottom" );
                    })
                    // During the transition the previous button gets bottom border
                    .prev( "li" ).children( "a" ).addClass( "border-bottom" )
                    // Remove the highlight
                    .end().end().children( ".ui-btn" ).removeClass( "ui-btn-active" );
            }
            // If it's not a touch device or the CSS transition isn't supported just remove the list item and refresh the list
            else {
                listitem.remove();
                $( "#list" ).listview( "refresh" );
            }
        });
        // Remove active state and unbind when the cancel button is clicked
        $( "#confirm #cancel" ).on( "click", function() {
            listitem.children( ".ui-btn" ).removeClass( "ui-btn-active" );
            $( "#confirm #yes" ).off();
        });
    }*/

