$(function () {
    chrome.storage.local.get('computerstatus', function (items) {
        status = items.computerstatus;
        $('#display').html(status);
    });
});