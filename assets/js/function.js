$(document).ready(function (e) {

  // lenis documentation setup
  // const lenis = new Lenis();

  // lenis.on('scroll', (e) => {
  //   // console.log(e);
  // })

  // function raf(time) {
  //   lenis.raf(time);
  //   requestAnimationFrame(raf);
  // }
  // requestAnimationFrame(raf);

  const lenis = new Lenis({
    duration: 0.8,
    easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);


  // parallax image on scroll
  gsap.utils.toArray("[data-module-parallax]").forEach((section) => {
    gsap.utils
      .toArray(section.querySelectorAll("[data-parallax]"))
      .forEach((parallax) => {
        const depth = parallax.dataset.speed;
        const movement = -(parallax.offsetHeight * depth);

        gsap.fromTo(
          parallax, {
            y: -movement
          }, {
            y: movement,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              scrub: true,
              markers: false
            }
          }
        );
      });
  });


  // mouse movement parallex
  $(".hero-section, .all-work-section").mousemove(function (e) {
    parallaxIt(e, ".intro--typo, .work--typo", -96);
  });

  function parallaxIt(e, target, movement) {
    var $this = $(".hero-section, .all-work-section");
    var relX = e.pageX - $this.offset().left;
    var relY = e.pageY - $this.offset().top;

    TweenMax.to(target, 1, {
      x: (relX - $this.width() / 2) / $this.width() * movement,
      y: (relY - $this.height() / 2) / $this.height() * movement
    });
  }

  $(".hero-section").mousemove(function (e) {
    parallaxIt(e, ".hero_typo", -32);
  });

  function parallaxIt(e, target, movement) {
    var $this = $(".hero-section");
    var relX = e.pageX - $this.offset().left;
    var relY = e.pageY - $this.offset().top;

    TweenMax.to(target, 1, {
      x: (relX - $this.width() / 2) / $this.width() * movement,
      y: (relY - $this.height() / 2) / $this.height() * movement
    });
  }

  // menu toggle
  if ($(window).width() < 991.98) {
    const toggle_menu = document.querySelector('#toggle-menu')
    const close_menu = document.querySelector('#close-menu')
    const headere_nav_body = document.querySelector('.header-nav-body')
    const tl = gsap.timeline({
      paused: true
    });

    tl.to(headere_nav_body, {
        duration: 0.6,
        ease: "power3.out",
        x: 0
      }).to(".nav-link, .header-item", {
        opacity: 1,
        y: 0,
        duration: 0.2,
        // stagger: {
        //   // wrap advanced options in an object
        //   each: 0.1,
        //   ease: "power1.in"
        // }
      })
      .reverse(); // Finally reverse the timeline. reversed() is true

    $("#toggle-menu").on('click', function (e) {
      // Toggle reversed to it's opposite value
      tl.reversed(!tl.reversed());
      // Use the toggle method in the classList API
      $("#toggle-menu").toggleClass("active");
    });

    $("#close-menu").on('click', function (e) {
      tl.reversed(!tl.reversed());
      $("#close-menu").toggleClass("active");
    });

    $(".nav-link").on('click', function (e) {
      tl.reversed(!tl.reversed());
    });
  }

  // anchor tag smooth scroll
  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    $('html, body').stop().animate({
      scrollTop: $($(this).attr('href')).offset().top
    }, 1000, 'linear');
  });

  // update copyright year
  var updateYear = new Date().getFullYear();
  $('.updateYear').html(updateYear);

  // custom cursor using gsap animation
  const cursor = document.querySelector(".cursor");
  const follower = document.querySelector(".cursor-follower");
  if ($(window).width() > 991.98) {
    const hover_cursor_text = document.querySelectorAll(".btn--primary, .btn--secondary, .card--work-item .card__img");
    const btn_icon_only = document.querySelectorAll(".logo, .btn--tertiary");

    let posX = 0,
      posY = 0,
      mouseX = 0,
      mouseY = 0;

    TweenMax.to({}, 0.01, {
      repeat: -1,
      onRepeat: function () {
        posX += (mouseX - posX) / 9;
        posY += (mouseY - posY) / 9;

        TweenMax.set(follower, {
          css: {
            left: posX - 20,
            top: posY - 20
          }
        });

        TweenMax.set(cursor, {
          css: {
            left: mouseX,
            top: mouseY
          }
        });
      }
    });

    $(document).on("mousemove", function (e) {
      mouseX = e.pageX;
      mouseY = e.pageY;
    });

    hover_cursor_text.forEach((el) => {
      $(el).on("mouseenter", function (e) {
        cursor.classList.add("active");
        follower.classList.add("active");
      });
      $(el).on("mouseleave", function (e) {
        cursor.classList.remove("active");
        follower.classList.remove("active");
      });

    });

    btn_icon_only.forEach((el) => {
      $(el).on("mouseenter", function (e) {
        cursor.classList.add("active");
        cursor.classList.add("empty_content");
        follower.classList.add("active");
      });
      $(el).on("mouseleave", function (e) {
        cursor.classList.remove("active");
        cursor.classList.remove("empty_content");
        follower.classList.remove("active");
      });
    });
  }
});