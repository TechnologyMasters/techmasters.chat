(function() {
    // TODO: make this a config
    var apiKey     = 'AIzaSyD3Y_GF0P3MSCWZKhkMQ0FrUfKUf07m4U4';
    var calendarId = 'zamtools.com_sksehlk62uahqednpmvbp7isno@group.calendar.google.com';

    // change delimiters to not conflict with Jekyll templates
    Vue.config.delimiters = ['[[', ']]'];

    Vue.filter('prettyDate', function(value) {
        var weekdays = ['Monday', 'Tuesday', 'Wedday', 'Thursday', 'Friday', 'Satday', 'Sunday'];
        var months   = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        var d = new Date(value);
        var weekday     = weekdays[d.getDay()];
        var month       = months[d.getMonth()];
        var twelveHours = ((d.getHours() + 11) % 12 + 1);
        var minutes     = ('0' + d.getMinutes()).slice(-2);
        var period      = (d.getHours() >= 12 ? 'PM' : 'AM');
        return '' + weekday + ', ' + month + ' ' + d.getDate() + ' ' + d.getFullYear() + ' ' + twelveHours + ':' + minutes + ' ' + period;
    });

    Vue.filter('googleMapUrl', function(value) {
        return 'http://maps.google.com/?q=' + encodeURIComponent(value);
    });

    var vue = new Vue({
        el: '#app',
        data: {
            events: []
        }
    });

    var getJson = function(url, params, success, failure) {
        var pairs = [];
        for (var attr in params) {
            pairs.push(attr + '=' + params[attr]);
        }
        url += '?' + pairs.join('&');

        var request = new XMLHttpRequest();
        request.open('GET', url, true);

        request.onload = function() {
            if (this.status >= 200 && this.status < 400) {
                success(JSON.parse(this.response));
            }
        };

        request.onerror = function(err) {
            failure(err);
        };

        request.send();
    };

    document.addEventListener('DOMContentLoaded', function() {
        var url = 'https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events';
        var params = {
            key: apiKey,
            timeMin: (new Date()).toISOString()
        };

        getJson(url, params,
            function(data) {
                // TODO: reverse order for descending dates
                vue.$data.events = data.items;
            },
            function(err) {
                console.log('error', err);
            }
        );
    });
})();

