// TODO: make this a config
var apiKey     = 'AIzaSyD3Y_GF0P3MSCWZKhkMQ0FrUfKUf07m4U4';
var calendarId = 'zamtools.com_sksehlk62uahqednpmvbp7isno@group.calendar.google.com';

// change delimiters to not conflict with Jekyll templates
Vue.config.delimiters = ['[[', ']]'];

Vue.filter('prettyDate', function(value) {
    var weekdays = ['Monday', 'Tuesday', 'Wedday', 'Thursday', 'Friday', 'Satday', 'Sunday'];
    var months   = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    var d = new Date(value);
    return '' + weekdays[d.getDay()] + ', ' + months[d.getMonth()] + ' ' + d.getDate() + ' ' + d.getFullYear();
});

Vue.filter('googleMap', function(value) {
    return 'http://maps.google.com/?q=' + encodeURIComponent(value);
});

var vue = new Vue({
    el: '#app',
    data: {
        events: []
    }
});

var getJson = function(url, success, failure) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);

    request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
            var data = JSON.parse(this.response);
            console.log(data);

            success(data);
        }
    };

    request.onerror = function(err) {
        failure(err);
    };

    request.send();
};

document.addEventListener('DOMContentLoaded', function() {
    var url = 'https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events?key=' + apiKey;

    getJson(
        url,
        function(data) {
            vue.$data.events = data.items;
        },
        function(err) {
            console.log('error', err);
        }
    );
});