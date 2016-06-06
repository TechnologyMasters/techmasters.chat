// TODO: make this a config
var apiKey     = 'AIzaSyD3Y_GF0P3MSCWZKhkMQ0FrUfKUf07m4U4';
var calendarId = 'zamtools.com_sksehlk62uahqednpmvbp7isno@group.calendar.google.com';

document.addEventListener('DOMContentLoaded', function() {
    var url = 'https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events?key=' + apiKey;

    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
            var data = JSON.parse(this.response);
            console.log(data);
        }
    };

    request.onerror = function() {
        console.log('error');
    };

    request.send();
});