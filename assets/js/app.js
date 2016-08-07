/* globals $, particlesJS */

$(function($) {
  if ($('#particles-js').length > 0) {
    particlesJS.load('particles-js', '/particles.json')
  }

  $('.arrow-link').click(function (event) {
    event.preventDefault()

    $('html, body').animate({scrollTop: $($(event.target).attr('href')).offset().top - 50}, 1000)
  })

  $('#joinBtn').click(function (event) {
    event.preventDefault()

    $('html, body').animate({scrollTop: $($(event.target).attr('href')).offset().top - 50}, 1000)
  })
})
