"use strict";


jQuery(document).ready(function ($) {

    jQuery(window).load(function () {
        jQuery(".loaded").fadeOut();
        jQuery(".preloader").delay(1000).fadeOut("slow");
    });
    /*---------------------------------------------*
     * Mobile menu
     ---------------------------------------------*/
//    jQuery('.navbar-collapse').find('a[href*=#]:not([href=#])').click(function () {
//        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
//            var target = $(this.hash);
//            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
//            if (target.length) {
//                $('html,body').animate({
//                    scrollTop: (target.offset().top - 40)
//                }, 1000);
//                if ($('.navbar-toggle').css('display') != 'none') {
//                    $(this).parents('.container').find(".navbar-toggle").trigger("click");
//                }
//                return false;
//            }
//        }
//    });



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

//anime
window.human = false;

var canvasEl = document.querySelector('.fireworks');
var ctx = canvasEl.getContext('2d');
var numberOfParticules = 30;
var pointerX = 0;
var pointerY = 0;
var tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';
var colors = ['#FF1461', '#18FF92', '#5A87FF', '#FBF38C'];

function setCanvasSize() {
  canvasEl.width = window.innerWidth * 2;
  canvasEl.height = window.innerHeight * 2;
  canvasEl.style.width = window.innerWidth + 'px';
  canvasEl.style.height = window.innerHeight + 'px';
  canvasEl.getContext('2d').scale(2, 2);
}

function updateCoords(e) {
  pointerX = e.clientX || e.touches[0].clientX;
  pointerY = e.clientY || e.touches[0].clientY;
}

function setParticuleDirection(p) {
  var angle = anime.random(0, 360) * Math.PI / 180;
  var value = anime.random(50, 180);
  var radius = [-1, 1][anime.random(0, 1)] * value;
  return {
    x: p.x + radius * Math.cos(angle),
    y: p.y + radius * Math.sin(angle)
  }
}

function createParticule(x,y) {
  var p = {};
  p.x = x;
  p.y = y;
  p.color = colors[anime.random(0, colors.length - 1)];
  p.radius = anime.random(16, 32);
  p.endPos = setParticuleDirection(p);
  p.draw = function() {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
    ctx.fillStyle = p.color;
    ctx.fill();
  }
  return p;
}

function createCircle(x,y) {
  var p = {};
  p.x = x;
  p.y = y;
  p.color = '#FFF';
  p.radius = 0.1;
  p.alpha = .5;
  p.lineWidth = 6;
  p.draw = function() {
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
    ctx.lineWidth = p.lineWidth;
    ctx.strokeStyle = p.color;
    ctx.stroke();
    ctx.globalAlpha = 1;
  }
  return p;
}

function renderParticule(anim) {
  for (var i = 0; i < anim.animatables.length; i++) {
    anim.animatables[i].target.draw();
  }
}

function animateParticules(x, y) {
  var circle = createCircle(x, y);
  var particules = [];
  for (var i = 0; i < numberOfParticules; i++) {
    particules.push(createParticule(x, y));
  }
  anime.timeline().add({
    targets: particules,
    x: function(p) { return p.endPos.x; },
    y: function(p) { return p.endPos.y; },
    radius: 0.1,
    duration: anime.random(1200, 1800),
    easing: 'easeOutExpo',
    update: renderParticule
  })
    .add({
    targets: circle,
    radius: anime.random(80, 160),
    lineWidth: 0,
    alpha: {
      value: 0,
      easing: 'linear',
      duration: anime.random(600, 800),  
    },
    duration: anime.random(1200, 1800),
    easing: 'easeOutExpo',
    update: renderParticule,
    offset: 0
  });
}

var render = anime({
  duration: Infinity,
  update: function() {
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
  }
});

document.addEventListener(tap, function(e) {
  window.human = true;
  render.play();
  updateCoords(e);
  animateParticules(pointerX, pointerY);
}, false);

var centerX = window.innerWidth / 2;
var centerY = window.innerHeight / 2;

function autoClick() {
  if (window.human) return;
  animateParticules(
    anime.random(centerX-50, centerX+50), 
    anime.random(centerY-50, centerY+50)
  );
  anime({duration: 200}).finished.then(autoClick);
}

autoClick();
setCanvasSize();
window.addEventListener('resize', setCanvasSize, false);