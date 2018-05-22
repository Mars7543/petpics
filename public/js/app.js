$(document).ready(function(){
    $('.slider').slider({
        indicators: false,
        duration: 800,
        interval: 3550
    });

    var slider = $('.slider');
    var body = $('body');

    slider.css('height', body.css('height'));
});

// ============== LANDING PAGE SCRIPTS ============== \\
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
