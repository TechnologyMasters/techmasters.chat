/* globals showdown, XMLHttpRequest, history, Promise */

var sdConverter = new showdown.Converter({
  simplifiedAutoLink: true
})

// Job Board Controller
var JobBoard = (function () {
  // Options
  var api = {
    endpoint: 'https://api.github.com/repos/TechnologyMasters/jobs/issues',
    headers: {
      Accept: 'application/vnd.github.v3+json'
    }
  }
  var jobs = null // contains fetched jobs

  /**
   * Components
   */

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

  // Wrapper for job rows
  var jobBody = (function (el) {
    var element = el

    return {
      set: function (value) {
        element.innerHTML = value
        return element
      }
    }
  })(document.getElementById('job-body'))

  // Single table row containing job details
  var jobItem = function (element, index) {
    var date = new Date(element.created_at)
    var dateOptions = {
      year: 'numeric', month: 'short', day: 'numeric'
    }
    var postedDate = date.toLocaleDateString('en-US', dateOptions)

    var labels = ''
    element.labels.forEach(function (label) {
      labels += '\
        <span class="mdl-chip">\
          <span class="mdl-chip__text">' + label.name + '</span>\
        </span>'
    })

    return '\
      <tr role="button" tabindex="0" data-index="' + index + '" onClick="JobBoard.expand(this.dataset.index)">\
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

  // "Expanded job description" wrapper
  var jobDescription = (function (el, title, body) {
    var element = el
    var elTitle = title
    var elBody = body

    return {
      setTitle: function (title) {
        elTitle.innerHTML = title
        return this
      },
      setBody: function (html, raw) {
        elBody.innerHTML = raw ? html : sdConverter.makeHtml(html)
        return this
      },
      close: function () {
        element.style.display = 'none'
      },
      open: function () {
        element.style.display = 'block'
      }
    }
  })(
    document.getElementById('tm-jobs_description'),
    document.getElementById('tm-jobs_description_title'),
    document.getElementById('tm-jobs_description_body')
    )

  return {
    loadHash: function () {
      var findJob = function (el) {
        return el.id === parseInt(window.location.hash.replace('#', ''))
      }

      var job = jobs.find(findJob)
      var jobIndex = jobs.findIndex(findJob)
      if (!!job === false) {
        return
      }

      this.expand(
        jobIndex,
        document.title,
        window.location.pathname + window.location.search
      )
    },
    loadJobs: function () {
      // Get jobs json
      var self = this
      var request = new XMLHttpRequest()

      var promise = new Promise(function (resolve, reject) {
        request.open('GET', api.endpoint)
        request.setRequestHeader('Accept', api.headers.Accept)
        request.onload = function () {
          if (request.status >= 200) {
            jobs = JSON.parse(request.responseText)
            self.listJobs()
            resolve()
          }
        }
        request.send()
      })

      return promise
    },
    expand: function (index, title, path) {
      history.pushState(undefined, undefined, '#' + jobs[index].id)
      jobDescription
        .setTitle(jobs[index].title)
        .setBody(jobs[index].body)
        .open()
      jobTable.close()
    },
    collapse: function () {
      history.pushState(
        '',
        document.title,
        window.location.pathname + window.location.search
      )
      jobDescription.close()
      jobTable.open()
    },
    listJobs: function () {
      var jobCollection = ''

      jobs.forEach(function (element, index) {
        jobCollection += jobItem(element, index)
      })

      jobBody.set(jobCollection)
    },
    showTable: jobTable.open
  }
})()

// Main
JobBoard.loadJobs().then(function () { // fetch job data from GitHub
  if (window.location.hash !== '') {
    JobBoard.loadHash()
  } else {
    JobBoard.showTable()
  }
})

window.onpopstate = function (event) {
  JobBoard.collapse()
}
