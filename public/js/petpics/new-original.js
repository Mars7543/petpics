$(document).ready(() => {

    $('.chips-placeholder').chips({
        placeholder: 'Add Tags (Press Enter After Each Tag)',
        secondaryPlaceholder: '+Tag',
        onChipAdd: modifyChipsWidth,
        onChipDelete: checkChipsWidth
    });

    $('input#description').characterCounter();

    // IMAGE PREVIEW
    upload = new FileUploadWithPreview('uploadImage');

    // NAVBAR
    $('.fixed-action-btn').floatingActionButton();
    $('.dropdown-trigger').dropdown({coverTrigger: false, hover: true});
});

// CHIPS FUNCTIONS
function modifyChipsWidth() {
    $('.chips-placeholder input').removeClass('fullChipsWidth');
    updateChipsDataInput();
}

function checkChipsWidth() {
    var chips = $('.chips-placeholder .chip');

    if (chips.length === 0)
        $('.chips-placeholder input').addClass('fullChipsWidth');

    updateChipsDataInput();
}

function updateChipsDataInput() {
    var chips = $('.chips-placeholder');
    var chipsData = M.Chips.getInstance(chips).chipsData;

    var input = $('#tags');
    var inputData = '';

    chipsData.forEach((data, index) => {
        inputData += (index == chipsData.length - 1 ? data.tag : data.tag + ',');
    });

    input.val(inputData);
}
