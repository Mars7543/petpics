$(document).ready(() => {

    gridInit('.grid-item', '.grid-sizer', '.gutter-sizer');
    $('input.comment').characterCounter();

    // NAVBAR
    $('.fixed-action-btn').floatingActionButton();
    $('.dropdown-trigger').dropdown({coverTrigger: false, hover: true});
});

// GRID FUNCTIONS
function gridInit(itemSelector, columnWidth, gutter) {
    $('.grid').masonry({
        itemSelector,
        columnWidth,
        percentPosition: true,
        gutter
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
}

function changeGrid() {
    $('.grid-sizer')
        .removeClass('grid-sizer')
        .addClass('grid-sizer-fullwidth');

    $('.grid-item')
        .removeClass('grid-item')
        .addClass('grid-item-fullwidth');

    gridInit('.grid-item-fullwidth', '.grid-sizer-fullwidth', '.gutter-sizer');
}

function originalGrid() {
    $('.grid-sizer-fullwidth')
        .removeClass('grid-sizer-fullwidth')
        .addClass('grid-sizer');

    $('.grid-item-fullwidth')
        .removeClass('grid-item-fullwidth')
        .addClass('grid-item');

    gridInit('.grid-item', '.grid-sizer', '.gutter-sizer');
}

// WRITE DATE POSTED
function writeAgo(selector, date) {
    var ago = moment(date).fromNow();
    $(`${selector}`).append(`Posted ${ago}`);
}

// WRITE LIKES
function writeLikes(selector, likes) {
    var like_text = '';
    var num;

    if (likes < 1000)  like_text = likes;

    else if (likes < 1000000) {
        num = +(likes / 1000).toFixed(2);
        like_text = num + "K";
    }

    else if (likes < 1000000000) {
        num = +(likes / 1000000).toFixed(2);
        like_text = num + "M";
    }

    else {
        num = +(likes / 1000000000).toFixed(2);
        like_text = num + "B";
    }

    $(`${selector}`).append(like_text);
}


// SEND AJAX REQUEST TO TOGGLE LIKES
function toggle_like(postID) {
    var url;

    var text = $(`#like-text_${postID}`);
    var icon = $(`#like-icon_${postID}`);

    if (text.text() === '') likes = 0;
    else likes = parseInt(text.text());

    if (icon.hasClass('far')) {
        // like
        icon.removeClass('far');
        icon.addClass('fas');

        likes++;
        text.text(`${likes}`);

        url = `${window.location.href}/${postID}/like`;

    } else {
        // unlike
        icon.removeClass('fas');
        icon.addClass('far');

        likes--;

        if (likes == 0) text.text('');
        else text.text(`${likes}`);

        url = `${window.location.href}/${postID}/unlike`;
    }

    icon.toggleClass('heart-active');

    $.ajax({
        type: 'POST',
        url,
        dataType: 'json'
    })
    .fail((jqXHR, textStatus, err) => {
        console.log('AJAX error: ', textStatus);
    });
}
