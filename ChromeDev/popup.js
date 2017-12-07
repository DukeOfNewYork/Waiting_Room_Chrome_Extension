$(function () {
    chrome.storage.local.get('buttonsetting', function (items) {
        console.log(items.buttonsetting);
        if (items.buttonsetting === 'hide') {
            $('#dropdown').hide();
        } else if (items.buttonsetting === 'show') {
            $('#dropdown').show();
        }
    });
    $('#saveButton').click(function () {
        $('#dropdown').html('test');
    });
    chrome.storage.local.get('computerstatus', function (items) {
        console.log(items.computerstatus);
        $('#display').html(items.computerstatus);
    });
});