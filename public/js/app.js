$(document).ready(function(){
    sliderInit();
    $('.fixed-action-btn').floatingActionButton();
    $('.dropdown-trigger').dropdown({coverTrigger: false, hover: true});

    $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
        gutter: '.gutter-sizer'
    });

    $('.show-comments.activator').click(() => {
        changeGrid();
    });

    $('.card-title.activator').click(() => {
        changeGrid();
    });

    $('.card-reveal .image-info').click(() => {
        originalGrid();
    });

    actionIconsInit();

    $('input.comment').characterCounter();
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

// ============== HOMEPAGE SCRIPTS ============== \\
function actionIconsInit() {
    // $('i.fa-heart.like').on('mouseover', function() {
    //     $(this).removeClass('far');
    //     $(this).addClass('fas');
    // }).on('mouseout', function() {
    //     $(this).removeClass('fas');
    //     $(this).addClass('far');
    // }).on('mousedown', function() {
    //     $(this).toggleClass('heart-active');
    // }).on('mouseup', function() {
    //     $(this).toggleClass('heart-active');
    // });

    $('i.fa-heart.like').on('mousedown', function() {
        $(this).toggleClass('heart-active');
    }).on('mouseup', function() {
        if ($(this).hasClass('far')) {
            $(this).removeClass('far');
            $(this).addClass('fas');
        } else {
            $(this).removeClass('fas');
            $(this).addClass('far');
        }

        $(this).toggleClass('heart-active');
    });
}

function changeGrid() {
    $('.grid-sizer')
        .removeClass('grid-sizer')
        .addClass('grid-sizer-fullwidth');

    $('.grid-item')
        .removeClass('grid-item')
        .addClass('grid-item-fullwidth');

    $('.grid').masonry({
        itemSelector: '.grid-item-fullwidth',
        columnWidth: '.grid-sizer-fullwidth',
        percentPosition: true,
        gutter: '.gutter-sizer'
    });
}

function originalGrid() {
    $('.grid-sizer-fullwidth')
        .removeClass('grid-sizer-fullwidth')
        .addClass('grid-sizer');

    $('.grid-item-fullwidth')
        .removeClass('grid-item-fullwidth')
        .addClass('grid-item');

    $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
        gutter: '.gutter-sizer'
    });
}
