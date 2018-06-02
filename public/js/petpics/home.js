$(document).ready(() => {



});

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
    var icon = $(`#like_${postID}`);

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

        text.text(`${likes}`);

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

// SEND AJAX REQUEST TO ADD COMMENT
function add_comment(postID) {
    var commentInput = $(`#comment_${postID}`);
    var comment = commentInput.val();
    var comment_number_text = $(`#comment-text_${postID}`);

    var url = `${window.location.href}/${postID}/comment/${comment}`;

    $.ajax({
        type: 'GET',
        url,
        complete: (response) => {
            data = response.responseJSON;

            // alert(JSON.stringify(data));
            if ($(`#no-comments_${postID}`).length) {
                $(`#comments_${postID}`).empty();
            }

            $(`#comments_${postID}`).append(`<strong>${data.user.username}:</strong> ${comment}`);
        }
    })

    .fail((jqXHR, textStatus, err) => {
        console.log('AJAX error: ', textStatus);
    });

    comment_number_text.text(parseInt(comment_number_text.text()) + 1);
    commentInput.val(' ');
}
