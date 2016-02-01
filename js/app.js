particlesJS.load('particles-js', 'particles.json', function() {
  console.log('callback - particles.js config loaded');
});
$(".arrow-link").click(function() {
	 event.preventDefault();
    $('html, body').animate({
        scrollTop: $("#maincontent").offset().top - 50
    }, 1000);
});
$("#joinBtn").click(function() {
	 event.preventDefault();
    $('html, body').animate({
        scrollTop: $("#joinNow").offset().top - 50
    }, 1000);
});