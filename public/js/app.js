$(document).ready(function(){
    
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
