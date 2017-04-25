---
---

const calendar = Vue.resource('https://www.googleapis.com/calendar/v3/calendars{/id}/events')

const apiOptions = {
  id: {{ site.googleCalendar.calendarId | jsonify }},
  key: {{ site.googleCalendar.apiKey | jsonify }},
  timeMin: moment().subtract(1, 'week').toISOString(),
  timeMax: moment().add(3, 'months').toISOString()
}

$APP = new Vue({
  el: '#app',
  components: {
    event: {
      delimiters: ['[[', ']]'],
      template: '#event',
      props: ['event'],
      computed: {
        description: function () {
          return marked(this.event.description, { sanitize: true })
        },

        location: function () {
          return 'http://maps.google.com/?q=' + encodeURIComponent(this.event.location)
        }
      },

      methods: {
        date: function (type) {
          return moment(this.event[type].date || this.event[type].dateTime).calendar()
        }
      }
    }
  },

  data: {
    events: {}
  },

  mounted: function () {
    calendar
      .get(apiOptions)
      .then(response => response.json())
      .then(data => data.items)
      .then(events => events.filter(event => event.status != 'cancelled'))
      .then(events => {
        events.sort((a, b) => {
          a = moment(a.start.date || a.start.dateTime)
          b = moment(b.start.date || b.start.dateTime)

          return a.diff(b, 'minutes')
        })

        return events
      })
      .then(events => events.filter(event => (new Date(event.start.dateTime)).getTime() > (new Date()).getTime()))
      .then(events => (this.$data.events = events))
  }
})
