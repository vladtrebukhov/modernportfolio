$(document).ready(function () {
  ('use strict');

  // here all ready functions

  edrea_tm_hamburger();
  edrea_tm_imgtosvg();
  //   edrea_tm_magnific_popup();
  edrea_tm_jarallax();
  edrea_tm_portfolio();
  edrea_tm_nav_bg_scroll();
  edrea_tm_anchor();
  edrea_tm_contact_form();
  edrea_tm_text_animation();
  edrea_tm_animate_text();
  edrea_tm_projects();
  edrea_tm_miniboxes();
  edrea_tm_portfolios();
  edrea_tm_portfolioo();
  edrea_tm_projectss();
  edrea_tm_isotope();
  edrea_tm_totop();
  edrea_tm_totop_myhide();
  edrea_tm_animate_text();
  edrea_tm_popup_blog();
  edrea_tm_popupscroll();
  edrea_tm_footer_fixed();
  edrea_tm_about_animation();
  edrea_tm_kenburn_slider();
  edrea_tm_ripple();
  edrea_tm_audiobox();
  edrea_tm_audio_off();

  $(window).on('scroll', function () {
    // e.preventDefault();
    edrea_tm_nav_bg_scroll();
    edrea_tm_totop_myhide();
  });

  $(window).on('resize', function () {
    edrea_tm_miniboxes();
    edrea_tm_portfolios();
    edrea_tm_isotope();
    edrea_tm_footer_fixed();
  });

  $(window).load('body', function () {
    setTimeout(function () {
      $('.edrea_tm_preloader').addClass('loaded');
    }, 1000);
  });
});

// -----------------------------------------------------
// --------------------  FUNCTIONS  --------------------
// -----------------------------------------------------

// -----------------------------------------------------
// ---------------    IMAGE TO SVG    ------------------
// -----------------------------------------------------

function edrea_tm_imgtosvg () {
  'use strict';

  $('img.svg').each(function () {
    var jQueryimg = $(this);
    var imgClass = jQueryimg.attr('class');
    var imgURL = jQueryimg.attr('src');

    $.get(
      imgURL,
      function (data) {
        // Get the SVG tag, ignore the rest
        var jQuerysvg = $(data).find('svg');

        // Add replaced image's classes to the new SVG
        if (typeof imgClass !== 'undefined') {
          jQuerysvg = jQuerysvg.attr('class', imgClass + ' replaced-svg');
        }

        // Remove any invalid XML tags as per http://validator.w3.org
        jQuerysvg = jQuerysvg.removeAttr('xmlns:a');

        // Replace image with new SVG
        jQueryimg.replaceWith(jQuerysvg);
      },
      'xml'
    );
  });
}

// -----------------------------------------------------
// ---------------  HAMBURGER  -------------------------
// -----------------------------------------------------

function edrea_tm_hamburger () {
  'use strict';

  var hamburger = $('.hamburger');
  var mobileMenu = $('.edrea_tm_mobile_menu_wrap');

  hamburger.on('click', function () {
    var element = $(this);

    if (element.hasClass('is-active')) {
      element.removeClass('is-active');
      mobileMenu.slideUp();
    } else {
      element.addClass('is-active');
      mobileMenu.slideDown();
    }
    return false;
  });
}
// -----------------------------------------------------
// --------------------    JARALLAX    -----------------
// -----------------------------------------------------

function edrea_tm_jarallax () {
  'use strict';

  $('.jarallax').each(function () {
    var element = $(this);
    var customSpeed = element.data('speed');

    if (customSpeed !== 'undefined' && customSpeed !== '') {
      customSpeed = customSpeed;
    } else {
      customSpeed = 0.5;
    }

    element.jarallax({
      speed: customSpeed
    });
  });
}

// -------------------------------------------------
// -----------------    PORTFOLIO    ---------------
// -------------------------------------------------

// filterable

function edrea_tm_portfolio () {
  'use strict';

  if ($().isotope) {
    // Needed variables
    var list = $('.edrea_tm_portfolio_list');
    var filter = $('.edrea_tm_portfolio_filter');

    if (filter.length) {
      // Isotope Filter
      filter.find('a').on('click', function () {
        var selector = $(this).attr('data-filter');
        list.isotope({
          filter: selector,
          animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
          }
        });
        return false;
      });

      // Change active element class
      filter.find('a').on('click', function () {
        filter.find('a').removeClass('current');
        $(this).addClass('current');
        return false;
      });
    }
  }
}

function edrea_tm_projects () {
  'use strict';

  $('.edrea_tm_portfolio_animation_wrap').each(function () {
    $(this)
      .on('mouseenter', function () {
        if ($(this).data('title')) {
          $('.edrea_tm_portfolio_titles').html(
            $(this).data('title') +
              '<span class="work__cat">' +
              $(this).data('category') +
              '</span>'
          );
          $('.edrea_tm_portfolio_titles').addClass('visible');
        }

        $(document).on('mousemove', function (e) {
          $('.edrea_tm_portfolio_titles').css({
            left: e.clientX - 10,
            top: e.clientY + 25
          });
        });
      })
      .on('mouseleave', function () {
        $('.edrea_tm_portfolio_titles').removeClass('visible');
      });
  });
}

// -----------------------------------------------------
// ------------    NAV BACKGROUND  SCROLL    -----------
// -----------------------------------------------------

function edrea_tm_nav_bg_scroll () {
  'use strict';

  var header = $('.edrea_tm_header');
  var headerH = header.outerHeight();
  var WH = $(window).height();
  var windowScroll = $(window).scrollTop();
  var W = $(window).width();

  if (W > 1040) {
    $(window).scroll(function () {
      if (windowScroll >= WH - headerH) {
        header.addClass('scroll');
      } else {
        header.removeClass('scroll');
      }
    });
    if (windowScroll >= WH - headerH) {
      header.addClass('scroll');
    } else {
      header.removeClass('scroll');
    }
  }
}

// -----------------------------------------------------
// ------------    ANCHOR NAVIGATION    ----------------
// -----------------------------------------------------

function edrea_tm_anchor () {
  'use strict';

  $('.anchor_nav').onePageNav();

  var scrollOffset = 0;

  $('.anchor a').on('click', function (evn) {
    evn.preventDefault();
    $('html,body').scrollTo(this.hash, this.hash, {
      gap: { y: -scrollOffset - 85 },
      animation: {
        duration: 1500,
        easing: 'easeInOutExpo'
      }
    });
    return false;
  });
}

// -----------------------------------------------------
// ----------------    CONTACT FORM    -----------------
// -----------------------------------------------------

function edrea_tm_contact_form () {
  'use strict';
  $('.contact_form #send_message').on('click', function (event) {
    var name = $('.contact_form #name').val();
    var email = $('.contact_form #email').val();
    var message = $('.contact_form #message').val();
    var subject = $('.contact_form #subject').val();
    var success = $('.contact_form .returnmessage').data('success');

    // checking for blank fields
    if (name === '' || email === '' || message === '') {
      $('div.empty_notice')
        .slideDown(500)
        .delay(2000)
        .slideUp(500);

      event.preventDefault();
    }

    if ((name, email, message)) {
      $.ajax({
        url: 'https://formspree.io/vladtrebukhov123@gmail.com',
        method: 'POST',
        data: $(this).serialize(),
        dataType: 'json'
      });

      $('.contact_form .returnmessage').empty();
    }
  });
}

// -----------------------------------------------------
// --------------------    OWL CAROUSEL    -------------
// -----------------------------------------------------

function edrea_tm_owl_carousel () {
  'use strict';

  var carousel = $('.edrea_tm_services_wrap .owl-carousel');
  carousel.owlCarousel({
    loop: true,
    items: 3,
    lazyLoad: true,
    margin: 30,
    autoplay: false,
    autoplayTimeout: 6000,
    smartSpeed: 2000,
    dots: true,
    nav: false,
    navSpeed: true,
    responsive: {
      0: { items: 1 },
      480: { items: 2 },
      768: { items: 3 },
      1040: { items: 3 },
      1200: { items: 3 },
      1600: { items: 3 },
      1920: { items: 3 }
    }
  });

  $('.edrea_tm_services_wrap .custom_nav > a.prev').on('click', function () {
    carousel.trigger('prev.owl.carousel');
    return false;
  });

  $('.edrea_tm_services_wrap .custom_nav > a.next').on('click', function () {
    carousel.trigger('next.owl.carousel');
    return false;
  });
  edrea_tm_imgtosvg();
}

// -----------------------------------------------------
// --------------------    WOW JS    -------------------
// -----------------------------------------------------

new WOW().init();

// -----------------------------------------------------
// ---------------    HERO TEXT ANIMATION  --------------
// -----------------------------------------------------

function edrea_tm_text_animation () {
  'use strict';

  var H = $(window).height();
  var titleHolder = $('.edrea_tm_hero_title');
  var titleHolder2 = $('.edrea_tm_hero_title_second');
  var titleHeight = titleHolder.outerHeight();
  var titleHeight2 = titleHolder2.outerHeight();
  var headerHeight = $('.edrea_tm_header').outerHeight();

  var height = H / 2 + titleHeight / 2 - headerHeight;
  var height2 = H / 2 + titleHeight2 / 2 - headerHeight;

  $(window).on('scroll', function () {
    var window_offset = $(window).scrollTop();
    titleHolder.css({
      opacity: 1 - window_offset / height,
      marginTop: (window_offset / height) * 200
    });
    titleHolder2.css({
      opacity: 1 - window_offset / height2,
      marginTop: (window_offset / height2) * 200
    });
  });
}

// -------------------------------------------------
// -------------   ANIMATE TEXT  -------------------
// -------------------------------------------------

function edrea_tm_animate_text () {
  'use strict';

  var animateSpan = $('.edrea_tm_animation_text_word');

  animateSpan.typed({
    strings: ['Vlad Trebukhov', "I'm a Software Engineer"],
    loop: true,
    startDelay: 1e3,
    backDelay: 2e3
  });
}

// -----------------------------------------------------
// -----------------    PROGRESS BAR    ----------------
// -----------------------------------------------------

function tdProgress (container) {
  'use strict';

  container.find('.edrea_tm_progress').each(function (i) {
    var progress = $(this);
    var pValue = parseInt(progress.data('value'), 10);
    var pColor = progress.data('color');
    var pBarWrap = progress.find('.edrea_tm_bar_wrap');
    var pBar = progress.find('.edrea_tm_bar');
    pBar.css({ width: pValue + '%', backgroundColor: pColor });
    setTimeout(function () {
      pBarWrap.addClass('open');
    }, i * 500);
  });
}
$('.edrea_tm_progress_wrap').each(function () {
  'use strict';
  var pWrap = $(this);
  pWrap.waypoint({
    handler: function () {
      tdProgress(pWrap);
    },
    offset: '90%'
  });
});

// -----------------------------------------------------
// -------------------    COUNTER    -------------------
// -----------------------------------------------------

$('.edrea_tm_counter').each(function () {
  'use strict';

  var el = $(this);
  el.waypoint({
    handler: function () {
      if (!el.hasClass('stop')) {
        el.addClass('stop').countTo({
          refreshInterval: 50,
          formatter: function (value, options) {
            return value
              .toFixed(options.decimals)
              .replace(/\B(?=(?:\d{3})+(?!\d))/g, ',');
          }
        });
      }
    },
    offset: '80%'
  });
});

// -----------------------------------------------------
// -----------------    MINI BOXES    ------------------
// -----------------------------------------------------

function edrea_tm_miniboxes () {
  'use strict';

  var el = $('.edrea_tm_miniboxes');

  if (el.length) {
    el.each(function (index, element) {
      var child = $(element).find('.edrea_tm_minibox');

      child.css({ height: 'auto' });
      // Get an array of all element heights

      var W = $(window).width();
      if (W > 480) {
        var elementHeights = child
          .map(function () {
            return $(this).outerHeight();
          })
          .get();

        // Math.max takes a variable number of arguments
        // `apply` is equivalent to passing each height as an argument
        var maxHeight = Math.max.apply(null, elementHeights);

        // Set each height to the max height
        child.css({ height: maxHeight + 'px' });
      }
    });
  }
}

// -------------------------------------------------
// -------------   PORTFOLIO -----------------------
// -------------------------------------------------

function edrea_tm_portfolios () {
  'use strict';

  var WW = $(window).width();
  var portfolioWidth = $('.edrea_tm_portfolio_home_wrap').width();
  var item = $('.edrea_tm_portfolio_home_wrap .item');
  var itemTall = $('.edrea_tm_portfolio_home_wrap .item.tall');
  var itemWide = $('.edrea_tm_portfolio_home_wrap .item.wide');
  var mTall = $('.edrea_tm_portfolio_home_wrap .item.m_tall');
  var mSimple = $('.edrea_tm_portfolio_home_wrap .item.m_simple');
  var mWide = $('.edrea_tm_portfolio_home_wrap .item.m_wide');
  var col3 = Math.floor(portfolioWidth / 3);
  var col2 = Math.floor(portfolioWidth / 2);
  var col1 = Math.floor(portfolioWidth);

  if (WW > 768) {
    // laptop
    item.css({
      width: col3 - 30 + 'px',
      height: Math.floor(col3 * 0.65) + 'px',
      margin: 15 + 'px'
    });
    itemTall.css({ height: Math.floor(col3 * 1.3) + 30 + 'px' });
    itemWide.css({
      width: Math.floor(col3 * 2) - 30 + 'px',
      height: Math.floor(col3 * 1.3) + 30 + 'px'
    });
  } else if (WW <= 768 && WW > 480) {
    // ipad
    item.css({
      width: col2 - 30 + 'px',
      height: Math.floor(col2 * 0.65) + 'px',
      margin: 15 + 'px'
    });
    itemTall.css({ height: Math.floor(col2 * 1.3) + 30 + 'px' });
    itemWide.css({
      width: Math.floor(col2 * 2) - 30 + 'px',
      height: Math.floor(col2 * 1.3) + 30 + 'px'
    });
    mTall.css({
      width: col2 - 30 + 'px ',
      height: Math.floor(col2 * 1.3) + 30 + 'px',
      margin: 15 + 'px'
    });
    mSimple.css({
      width: col2 - 30 + 'px',
      height: Math.floor(col2 * 0.65) + 'px',
      margin: 15 + 'px'
    });
    mWide.css({
      width: col1 - 30 + 'px',
      height: Math.floor(col2 * 1.3) + 'px',
      margin: 15 + 'px'
    });
  } else {
    // mobile
    item.css({
      width: col1 - 20 + 'px',
      height: Math.floor(col1 * 0.65) + 'px',
      margin: 10 + 'px'
    });
  }
}

// filterable

function edrea_tm_portfolioo () {
  'use strict';

  if ($().isotope) {
    // Needed variables
    var list = $('.edrea_tm_portfolio_list');
    var filter = $('.edrea_tm_portfolio_filter');

    if (filter.length) {
      // Isotope Filter
      filter.find('a').on('click', function () {
        var selector = $(this).attr('data-filter');
        list.isotope({
          filter: selector,
          animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
          }
        });
        return false;
      });

      // Change active element class
      filter.find('a').on('click', function () {
        filter.find('a').removeClass('current');
        $(this).addClass('current');
        return false;
      });
    }
  }
}

function edrea_tm_projectss () {
  'use strict';

  $('.edrea_tm_portfolio_animation_wrap').each(function () {
    $(this)
      .on('mouseenter', function () {
        if ($(this).data('title')) {
          $('.edrea_tm_portfolio_titles').html(
            $(this).data('title') +
              '<span class="work__cat">' +
              $(this).data('category') +
              '</span>'
          );
          $('.edrea_tm_portfolio_titles').addClass('visible');
        }

        $(document).on('mousemove', function (e) {
          $('.edrea_tm_portfolio_titles').css({
            left: e.clientX - 10,
            top: e.clientY + 25
          });
        });
      })
      .on('mouseleave', function () {
        $('.edrea_tm_portfolio_titles').removeClass('visible');
      });
  });
}

// -----------------------------------------------------
// --------------    ISOTOPE MASONRY    ----------------
// -----------------------------------------------------

function edrea_tm_isotope () {
  'use strict';

  $('.masonry').isotope({
    itemSelector: '.masonry_item',
    masonry: {}
  });
}

// -----------------------------------------------------
// --------------------    TOTOP    --------------------
// -----------------------------------------------------

function edrea_tm_totop () {
  'use strict';

  $('.edrea_tm_totop').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, 'slow');
    return false;
  });
}

function edrea_tm_totop_myhide () {
  'use strict';

  var toTop = $('.edrea_tm_totop');
  if (toTop.length) {
    var topOffSet = toTop.offset().top;

    if (topOffSet > 1000) {
      toTop.addClass('opened');
    } else {
      toTop.removeClass('opened');
    }
  }
}
// -------------------------------------------------
// -------------   ANIMATE TEXT  -------------------
// -------------------------------------------------

function edrea_tm_animate_text () {
  'use strict';

  var animateSpan = $('.edrea_tm_animation_text_word');

  animateSpan.typed({
    strings: ['Vlad Trebukhov', 'a Software Engineer'],
    loop: true,
    startDelay: 1e3,
    backDelay: 2e3
  });
}

// -----------------------------------------------------
// -------------------    POPUP BLOG    ----------------
// -----------------------------------------------------

function edrea_tm_popup_blog () {
  'use strict';
  var li = $('.edrea_tm_list_wrap.blog_list .inner_list');
  var popupBox = $('#edrea_tm_popup_blog');
  var popupInner = popupBox.find('.inner_popup');
  var closePopup = popupBox.find('.close');

  li.each(function () {
    var element = $(this);
    var button = element.find('.read_more a,.title_holder a,.link_news');
    var html = element.html();
    var mainImage = element.find('.news_image');
    var imgData = mainImage.data('url');
    var title = element.find('.title_holder h3');
    var titleHref = element.find('.title_holder h3 a').html();

    mainImage.css({ backgroundImage: 'url(' + imgData + ')' });
    button.on('click', function () {
      popupBox.addClass('opened');
      popupInner.html(html);
      mainImage = popupInner.find('.news_image');
      mainImage.css({ backgroundImage: 'url(' + imgData + ')' });
      title = popupInner.find('.title_holder h3');
      title.html(titleHref);
      return false;
    });
  });
  closePopup.on('click', function () {
    popupBox.removeClass('opened');
    popupInner.html('');
    return false;
  });
}

// -----------------------------------------------------
// -------------    WIDGET MENU SCROLL -----------------
// -----------------------------------------------------

function edrea_tm_popupscroll () {
  'use strict';

  var H = $(window).height();
  var scrollable = $('.scrollable');

  var popupBox = $('.edrea_tm_popup_blog .inner_popup');

  popupBox.css({ height: H - 100 });

  scrollable.each(function () {
    var element = $(this);
    var wH = $(window).height();

    element.css({ height: wH - 100 });

    element.niceScroll({
      touchbehavior: false,
      cursorwidth: 0,
      autohidemode: true,
      cursorborder: '0px solid #fff'
    });
  });
}

// -----------------------------------------------------
// -------------    FIXED FOOTER -----------------------
// -----------------------------------------------------

function edrea_tm_footer_fixed () {
  'use strict';

  var content = $('.edrea_tm_content');
  var footer = $('.edrea_tm_footer_contact_wrapper_all').outerHeight();
  var WW = $(window).width();

  if (WW > 768) {
    content.css({ marginBottom: footer });
  } else {
    content.css({ marginBottom: 0 });
  }
}

// -----------------------------------------------------
// -------------    PARALLAX ANIMATION    --------------
// -----------------------------------------------------

function edrea_tm_about_animation () {
  'use strict';

  if ($('.parallax').length > 0) {
    var scene = $('.parallax').get(0);
    var parallax = new Parallax(scene, {
      relativeInput: true,
      onReady: function () {
        console.log('ready!');
      }
    });
  }
}

// -------------------------------------------------
// -------------  SLIDER KENBURN  ------------------
// -------------------------------------------------

function edrea_tm_kenburn_slider () {
  'use strict';

  $(function () {
    $('.edrea_tm_hero_header .overlay_slider').vegas({
      timer: false,
      animation: ['kenburnsUp', 'kenburnsLeft', 'kenburnsRight'],
      delay: 7000,

      slides: [
        { src: 'img/hero/1.jpg' },
        { src: 'img/hero/2.jpg' },
        { src: 'img/hero/3.jpg' }
      ]
    });
  });
}

// -------------------------------------------------
// -------------  RIPPLE  --------------------------
// -------------------------------------------------

function edrea_tm_ripple () {
  'use strict';

  $('#ripple').ripples({
    resolution: 500,
    dropRadius: 20,
    perturbance: 0.04
  });
}

// -----------------------------------------------------
// -----------------    AUDIOBOX    --------------------
// -----------------------------------------------------
function edrea_tm_audiobox () {
  'use strict';

  var curPlaying;
  var speaker = $('.edrea_tm_audio_icon a');

  speaker.on('click', function (e) {
    e.preventDefault();
    if (!speaker.hasClass('paused')) {
      speaker.addClass('paused');
    } else {
      speaker.removeClass('paused');
    }
    var song = $('audio')[0];

    if (song.paused) {
      song.play();
      if (curPlaying) {
        $('audio', '#' + curPlaying)[0].pause();
      }
    } else {
      song.pause();
    }
    curPlaying = $(this).parent()[0].id;
  });
}
function edrea_tm_audio_off () {
  'use strict';

  var element = $('.edrea_tm_wrapper_all');
  var dataAudio = element.data('audio');
  var audioBox = $('.edrea_tm_audio_wrap');

  if (dataAudio !== 'off') {
    audioBox.find('audio').attr('autoplay', '');
  }
}
