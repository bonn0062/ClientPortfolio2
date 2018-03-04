"use strict";


jQuery(document).ready(function ($) {

    jQuery(window).load(function () {
        jQuery(".loaded").fadeOut();
        jQuery(".preloader").delay(1000).fadeOut("slow");
    });
    /*---------------------------------------------*
     * Mobile menu
     ---------------------------------------------*/
  jQuery('.navbar-collapse').find('a[href*=#]:not([href=#])').click(function () {
       if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
           var target = $(this.hash);
           target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
           if (target.length) {
               $('html,body').animate({
                   scrollTop: (target.offset().top - 40)
               }, 1000);
               if ($('.navbar-toggle').css('display') != 'none') {
                   $(this).parents('.container').find(".navbar-toggle").trigger("click");
               }
               return false;
           }
       }
   });



    /*---------------------------------------------*
     * STICKY scroll
     ---------------------------------------------*/

//    jQuery(".main-nav").localScroll();

    $('.body').scrollSpy();

//    $('.button-collapse').sideNav({
//        menuWidth: 250, // Default is 240
//        edge: 'right', // Choose the horizontal origin
//        closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
//    }
//    );

    jQuery(".dropdown-button").dropdown({
        inDuration: 300,
        outDuration: 255,
        constrain_width: false,
        hover: true,
        gutter: 0,
        belowOrigin: false,
        alignment: 'right'
    });



    /*---------------------------------------------*
     * STICKY scroll
     ---------------------------------------------*/

//    $('').localScroll();

    /*---------------------------------------------*
     * WOW
     ---------------------------------------------*/

    var wow = new WOW({
        mobile: false // trigger animations on mobile devices (default is true)
    });
    wow.init();

    /* ---------------------------------------------------------------------
     Carousel
     ---------------------------------------------------------------------= */

    $('.test_slider').owlCarousel({
        responsiveClass: true,
        autoplay: false,
        items: 1,
        loop: true,
        dots: false,
        nav: false,
        navText: [
            "<i class='lnr lnr-chevron-left'></i>",
            "<i class='lnr lnr-chevron-right'></i>"
        ],
        autoplayHoverPause: true

    });


// scroll Up

    jQuery(window).scroll(function () {
        if ($(this).scrollTop() > 600) {
            $('.scrollup').fadeIn('slow');
        } else {
            $('.scrollup').fadeOut('slow');
        }
    });
    jQuery('.scrollup').click(function () {
        $("html, body").animate({scrollTop: 0}, 1000);
        return false;
    });


    jQuery('.gallery-img').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    });



    /*---------------------------------------------*
     * Menu Section
     ---------------------------------------------*/

    $('.cd-menu-trigger').on('click', function (event) {
        event.preventDefault();
        $('.home-main-content').addClass('move-out');
        $('#main-nav').addClass('is-visible');
        $('.cd-shadow-layer').addClass('is-visible');
    });
    //close menu
    $('.cd-close-menu').on('click', function (event) {
        event.preventDefault();
        $('.home-main-content').removeClass('move-out');
        $('#main-nav').removeClass('is-visible');
        $('.cd-shadow-layer').removeClass('is-visible');
    });

    //clipped image - blur effect
    set_clip_property();
    $(window).on('resize', function () {
        set_clip_property();
    });

    function set_clip_property() {
        var $header_height = $('.cd-header').height(),
                $window_height = $(window).height(),
                $header_top = $window_height - $header_height,
                $window_width = $(window).width();
        $('.cd-blurred-bg').css('clip', 'rect(' + $header_top + 'px, ' + $window_width + 'px, ' + $window_height + 'px, 0px)');
    }
    $('#main-nav a[href^="#"]').on('click', function (event) {
        event.preventDefault();
        var target = $(this.hash);
        $('.home-main-content').removeClass('move-out');
        $('#main-nav').removeClass('is-visible');
        $('.cd-shadow-layer').removeClass('is-visible');
        $('body,html').animate(
                {'scrollTop': target.offset().top},
                900
                );
    });
    
    
// scrolldown icon
$('.scrolldown a').bind('click', function () {
    $('html , body').stop().animate({
        scrollTop: $($(this).attr('href')).offset().top - 160
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
});





    //End
});




jQuery(document).on("scroll", function () {
    if ($(document).scrollTop() > 120) {
        $("header").addClass("small");
    } else {
        $("header").removeClass("small");
    }
});

jQuery(document).on('click', '.navbar-collapse.in', function (e) {
    if ($(e.target).is('a')) {
        $(this).collapse('hide');
    }
});

//Blog

$(blog)(function () {
	var $content = $('#jsonContent');
	var data = {
		rss_url: 'https://medium.com/feed/@tosfan4ever'
	};
	$.get('https://api.rss2json.com/v1/api.json', data, function (response) {
		if (response.status == 'ok') {
			var output = '';
			$.each(response.items, function (k, item) {
				var visibleSm;
				if(k < 3){
					visibleSm = '';
				 } else {
					 visibleSm = ' visible-sm';
				 }
				output += '<div class="col-sm-6 col-md-4' + visibleSm + '">';
				output += '<div class="blog-post"><header>';
				output += '<h4 class="date">' + $.format.date(item.pubDate, "dd<br>MMM") + "</h4>";
				var tagIndex = item.description.indexOf('<img'); // Find where the img tag starts
				var srcIndex = item.description.substring(tagIndex).indexOf('src=') + tagIndex; // Find where the src attribute starts
				var srcStart = srcIndex + 5; // Find where the actual image URL starts; 5 for the length of 'src="'
				var srcEnd = item.description.substring(srcStart).indexOf('"') + srcStart; // Find where the URL ends
				var src = item.description.substring(srcStart, srcEnd); // Extract just the URL
				output += '<div class="blog-element"><img class="img-responsive" src="' + src + '" width="360px" height="240px"></div></header>';
				output += '<div class="blog-content"><h4><a href="'+ item.link + '">' + item.title + '</a></h4>';
				output += '<div class="post-meta"><span>By ' + item.author + '</span></div>';
				var yourString = item.description.replace(/<img[^>]*>/g,""); //replace with your string.
				var maxLength = 120 // maximum number of characters to extract
				//trim the string to the maximum length
				var trimmedString = yourString.substr(0, maxLength);
				//re-trim if we are in the middle of a word
				trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
				output += '<p>' + trimmedString + '...</p>';
				output += '</div></div></div>';
				return k < 3;
			});
			$content.html(output);
		}
	});
});

