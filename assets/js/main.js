/*Preloader*/
$(window).load(function () {
    setTimeout(function () {
        $("#status").fadeOut("slow");
        $("#preloader").addClass('slide');
    }, 200);
    setTimeout(function () {
        $("#grid .grid-line").addClass('line');
        $(".first-title").addClass('toleft');
        $(".second-title").addClass('toright');
    }, 300);
});
/*back-to-top-button*/
jQuery(document).ready(function ($) {
    var offset = 300
        , offset_opacity = 1200
        , scroll_top_duration = 700
        , $back_to_top = $('.cd-top');
    $(window).scroll(function () {
        ($(this).scrollTop() > offset) ? $back_to_top.addClass('cd-is-visible'): $back_to_top.removeClass('cd-is-visible cd-fade-out');
        if ($(this).scrollTop() > offset_opacity) {
            $back_to_top.addClass('cd-fade-out');
        }
    });
    $back_to_top.on('click', function (event) {
        event.preventDefault();
        $('body,html').animate({
            scrollTop: 0
        , }, scroll_top_duration);
    });
    
    // Add smooth scrolling to all links
    $(".btn").on('click', function (event) {
        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();
            // Store hash
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 1000, function () {
                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });
});