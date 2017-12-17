$(function () {
    var server = null, name = null;
    //The save on click listener checks the input fields for any non-null data
    $('#Save').click(function () {
        var isValid = true;
        $('#name,#server').each(function () {
            if ($.trim($(this).val()) === '') {
                isValid = false;
            }
        });
        if (isValid === true) {
            server = $('#server').val();
            name = $('#name').val();
            chrome.storage.local.set({'serveraddress': server, 'computerName': name}, function () {
                console.log(server);
                //after validating the inputs a ajax get is run to verify a reply can be made
                $.ajax({
                    type: "GET",
                    ContentType: 'application/json',
                    url: server,
                    dataType: "json"
                }).done(function (data, status) {
                    $('#serverTest').html(data + " " + status);
                }).fail(function (data, status) {
                    $('#serverTest').html(status);
                })
            });
        }
    });
});