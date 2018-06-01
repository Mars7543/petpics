$(document).ready(() => {
    positionFooter();

    $(window).resize(() => { positionFooter(); });
});

function positionFooter() {
    var windowHeight = $(window).height();
    var footerPosition = $("footer").position().top;

    if (windowHeight >= footerPosition) {
        $("footer").css("position", "absolute");
        $("footer").css("bottom", "0");
        $("footer").css("width", "100%");
    } else {
        $("footer").css("position", "relative");
        $("footer").css("display", "block");
    }
}
