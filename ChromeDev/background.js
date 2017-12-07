chrome.runtime.onStartup.addListener(function () {
    chrome.storage.local.clear()
});
$(function () {
    var notif = {
        type: "basic",
        title: "Ready",
        message: "You are ready to be seen",
        iconUrl: "icon.png"
    };
    setInterval(function () {
        chrome.storage.local.get({'serveraddress':[],'computerName':[]}, function (items) {
            var computerName = items.computerName, serverAddress = items.serveraddress;
            console.log(items.serveraddress);
            console.log(computerName);
            if (items.serveraddress && items.computerName) {
                $.ajax({
                    type: "POST",
                    ContentType: 'application/json',
                    url: serverAddress,
                    data: JSON.stringify({computer: computerName, status: "testing"}),
                    dataType: "json",
                    success: function (data) {
                        var parsed = (JSON.parse(data));
                        var status = parsed[0].fields.status;
                        console.log(status);
                        chrome.storage.local.set({'computerstatus': status}, function () {
                        });
                        if (status === "RD") {
                            chrome.notifications.create('ready', notif, function () {
                            })
                        }
                    },
                    failure:
                        function (err) {
                            console.log(err);
                        }
                })
            }
        })
    }, 5000);
});