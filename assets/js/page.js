function setPermalinks () {
  var headers = document.querySelectorAll('.tm-container h4')

  // Apply permalinks to headers
  if (headers.length > 0) {
    Array.prototype.forEach.call(headers, function (el, i) {
      el.innerHTML = '<a href="#' + el.id + '">' + el.innerHTML + '</a>'
    })
  }
}

setPermalinks()
