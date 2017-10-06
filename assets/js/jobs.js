/* globals showdown */

var sdConverter = new showdown.Converter()

window.onload = function(event)
{
  if (location.hash != "") {
    JobBoard.load()
  }
}

window.onpopstate = function(event)
{
  JobBoard.collapse()
}

var JobBoard = (function () {
  // Data
  var api = {
    endpoint: 'https://api.github.com/repos/TechnologyMasters/jobs/issues',
    headers: {
      Accept: 'application/vnd.github.v3+json'
    }
  }
  var jobs = null

  // Components
  var jobTable = (function (el) {
    var element = el

    return {
      close: function () {
        element.style.display = 'none'
      },
      open: function () {
        element.style.display = 'table'
      }
    }
  })(document.getElementById('job-table'))

  var jobBody = document.getElementById('job-body')
  var jobItem = function (element, index) {
    var date = new Date(element.created_at)
    var dateOptions = {
      year: "numeric", month: "short", day: "numeric"
    }
    var postedDate = date.toLocaleDateString("en-US", dateOptions)

    var labels = ''
    element.labels.forEach(function(label) {
      labels += '\
        <span class="mdl-chip">\
          <span class="mdl-chip__text">' + label.name + '</span>\
        </span>'
    })

    return '\
      <tr role="button" tabindex="0" data-index="' + index + '" onClick="JobBoard.expand(this)">\
        <td class="mdl-data-table__cell--non-numeric">\
          ' + element.title + '\
        </td>\
        <td class="mdl-data-table__cell--non-numeric show-tablet-up">\
          ' + postedDate + '\
        </td>\
        <td class="mdl-data-table__cell--non-numeric show-desktop-up">\
          ' + labels + '\
        </td>\
      </tr>'
  }

  var jobDescription = (function (el, body) {
    var element = el
    var elBody = body

    return {
      set: function (html) {
        elBody.innerHTML = html
        return this
      },
      close: function () {
        element.style.display = 'none'
      },
      open: function () {
        element.style.display = 'block'
      }
    }
  })(document.getElementById('tm-jobs-description'), document.getElementById('tm-jobs-description_body'))

  // Get jobs json
  var request = new XMLHttpRequest()
  request.open('GET', api.endpoint)
  request.setRequestHeader('Accept', api.headers.Accept)
  request.onload = function () {
    if (request.status >= 200) {
      jobs = JSON.parse(request.responseText)
      setupJobs()
    }
  }

  request.send()

  // Create paginated list
  var setupJobs = function () {
    var jobCollection = ''

    jobs.forEach(function (element, index) {
      jobCollection += jobItem(element, index)
    });

    jobBody.innerHTML = jobCollection
  }
  
  var jobById = function(job) {
    return job.id == location.hash.replace("#", "")
  }

  return {
    load: function () {
      jobDescription.set(sdConverter.makeHtml(jobs.find(jobById).body)).open()
      jobTable.close()
    },
    expand: function (el) {
      history.pushState(undefined, undefined, "#" + jobs[el.dataset.index].id)
      jobDescription.set(sdConverter.makeHtml(jobs[el.dataset.index].body)).open()
      jobTable.close()
    },
    collapse: function () {
      history.pushState("", document.title, window.location.pathname + window.location.search)
      jobDescription.close()
      jobTable.open()
    }
  }
})()
