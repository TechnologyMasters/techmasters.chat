/* globals $, particlesJS */

particlesJS.load('particles-js', '/particles.json')

$('.arrow-link').click(function (event) {
  event.preventDefault()

  $('html, body').animate({scrollTop: $('#maincontent').offset().top - 50}, 1000)
})
