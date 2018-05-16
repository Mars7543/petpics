$(document).ready(function(){
    $('.parallax').parallax();

    var logo = $('.logo');

    var nav = $('#navbar');

    var a1 = $('.sign-up');
    var a2 = $('.login');
    var a3 = $('.more-info');

    var active = 0;

    logo.mouseover(function() {
        logo.css('animation', 'none');
    });

    logo.click(function(){

        if (active == 0) {
            logo.css('-webkit-transform', 'rotate(360deg)');

            a1.fadeToggle(50);
            a1.animate({left: '+=260px'});

            setTimeout(() => {
                a2.fadeToggle(50);
                a2.animate({left: '+=160px'});
            }, 150);

            setTimeout(() => {
                a3.fadeToggle(150);
                a3.animate({left: '+=15px'});
            }, 200);

            active = 1;
        } else {
            logo.css('-webkit-transform', 'rotate(0deg)');

            a1.fadeToggle(150);
            a1.animate({left: '-=260px'});

            setTimeout(() => {
                a2.fadeToggle(150);
                a2.animate({left: '-=160px'});
            }, 125);

            setTimeout(() => {
                a3.fadeToggle(150);
                a3.animate({left: '-=15px'});
            }, 200);

            active = 0;
        }
    });
});
