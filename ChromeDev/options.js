$(function () {
    var server = null, name = null;
    $('#Save').click(function () {
        var isValid = true;
        $('#name,#server').each(function () {
            if ($.trim($(this).val()) === '') {
                isValid = false;
                $(this).css({
                    "border": "1px solid red",
                    "background": "#FFCECE"
                });
            }
            else {
                $(this).css({
                    "border": "",
                    "background": ""
                });
            }
        });
        if (isValid === true) {
            server = $('#server').val();
            name = $('#name').val();
            chrome.storage.local.set({'serveraddress': server, 'computerName': name}, function () {
                console.log(server);
                $.ajax({
                    type: "GET",
                    ContentType: 'application/json',
                    url: server,
                    dataType: "json",
                    success: function (data, status) {
                        console.log(data + " " + status);
                        $('#serverTest').html(data + " " + status);
                    }
                })
            });
        }
    });
});