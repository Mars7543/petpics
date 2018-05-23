$(document).ready(function(){
    sliderInit();
    $('.fixed-action-btn').floatingActionButton();
    $('.dropdown-trigger').dropdown({coverTrigger: false, hover: true});
    // $('#dropdown-icon').click(() => {
    //     $('#search').focus();
    // });
});

// ============== LANDING PAGE SCRIPTS ============== \\
function sliderInit() {
    $('.slider').slider({
        indicators: false,
        duration: 800,
        interval: 3750
    });

    setSliderSize();
}

function setSliderSize() {
    var slider = $('.slider');
    var body = $('body');

    slider.css('height', body.css('height'));

    window.addEventListener( "orientationchange", function( event ) {
        setSliderSize();
    });
}

function changeForms() {
    var loginForm = $('#login');
    var signupForm = $('#signup');

    if (loginForm.css('display') === 'none') {
        signupForm.fadeToggle(() => {
            loginForm.fadeToggle(300);
        });
    } else {
        loginForm.fadeToggle(() => {
            signupForm.fadeToggle(300);
        });
    }
}

// ============== MAIN PAGE SCRIPTS ============== \\
