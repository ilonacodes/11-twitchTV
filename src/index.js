(function () {
    "use strict";

    var usersElem = document.querySelector('.users');
    var streams = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

    function getUserData(name) {

        var apiURL = 'https://wind-bow.gomix.me/twitch-api/streams/' + name + '/';

        var userElem = document.createElement('div');
        usersElem.appendChild(userElem);
        userElem.classList.add('user');

        var nameElem = document.createElement('div');
        userElem.appendChild(nameElem);
        nameElem.classList.add('name');


        var statusElem = document.createElement('div');
        userElem.appendChild(statusElem);
        statusElem.classList.add('user');

        var statusTextElem = document.createElement('div');
        statusElem.appendChild(statusTextElem);
        statusTextElem.classList.add('statusText');

        const script = document.createElement('script');

        window['streamCallback__' + name] = function (data) {
            if (!data.stream) {
                nameElem.innerText = name;
                userElem.classList.add('offline');
            } else {
                console.log(data.stream);
                var linkElem = document.createElement('a');
                linkElem.setAttribute('href', data.stream.channel.url);
                linkElem.innerText = data.stream.channel.display_name;
                linkElem.classList.add('link');
                nameElem.appendChild(linkElem);
                statusTextElem.innerText = data.stream.channel.status;

            }
        };

        script.src = apiURL + '?callback=streamCallback__' + name;

        document.getElementsByTagName('body')[0].appendChild(script);

    }

    document.getElementById('online').addEventListener('click', function () {
        document.querySelector('.users').classList.add('hide-offline');
        document.querySelector('#all').classList.remove('selected');
        document.querySelector('#online').classList.add('selected');
    });

    document.getElementById('all').addEventListener('click', function () {
        document.querySelector('.users').classList.remove('hide-offline');
        document.querySelector('#all').classList.add('selected');
        document.querySelector('#online').classList.remove('selected');
    });

    streams.forEach(function (stream) {
        getUserData(stream);
    });

})();