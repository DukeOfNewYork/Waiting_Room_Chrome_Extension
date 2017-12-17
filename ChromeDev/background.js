$(function () {
    var computerName, serverAddress, notif = {
        type: "basic",
        title: "Ready",
        message: "You are ready to be seen",
        iconUrl: "icon.png"
    };
    setInterval(function () {
        chrome.storage.local.get({'serveraddress': [], 'computerName': []}, function (items) {
            computerName = items.computerName, serverAddress = items.serveraddress;
            console.log(serverAddress);
            console.log(computerName);
        });
        if (serverAddress && computerName) {
            $.ajax({
                type: "POST",
                ContentType: 'application/json',
                url: serverAddress,
                data: JSON.stringify({computer: computerName, status: "testing"}),
                dataType: "json"
            }).done(function (data) {
                var status = (JSON.parse(data))[0].fields.status;
                console.log(status);
                chrome.storage.local.set({'computerstatus': status}, function () {
                });
                if (status === "RD") {
                    chrome.notifications.create('ready', notif, function () {
                    })
                }
            }).fail(function (data, status) {
                console.log(err);
            })
        }
    }, 5000);
});