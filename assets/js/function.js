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

  // Initialize Lenis Smooth Scroll
  // const lenis = new Lenis({
  //   duration: 0.8,
  //   easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  //   direction: "vertical",
  //   gestureDirection: "vertical",
  //   smooth: true,
  //   smoothTouch: false,
  //   touchMultiplier: 2,
  // });

  // RAF Sync with GSAP ScrollTrigger
  // function raf(time) {
  //   lenis.raf(time);
  //   ScrollTrigger.update();
  //   requestAnimationFrame(raf);
  // }
  // requestAnimationFrame(raf);

  // lenis.on("scroll", ScrollTrigger.update);

  // gsap.registerPlugin(ScrollTrigger);

  // Ensure all .card__img elements clip overflow
  document.querySelectorAll(".card__img").forEach((el) => {
    el.style.overflow = "hidden";
    // el.style.position = "relative";
  });

  // Parallax Effect on Images Inside Cards
  gsap.utils.toArray("[data-module-parallax]").forEach((section) => {
    const parallaxImages = section.querySelectorAll("[data-parallax]");

    parallaxImages.forEach((img) => {
      const depth = parseFloat(img.dataset.speed) || -0.2;
      const movement = depth * 80; // smaller value = subtler motion

      gsap.fromTo(
        img, {
          yPercent: movement
        }, // start slightly shifted
        {
          yPercent: -movement, // move opposite as you scroll
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            markers: false, // turn true to debug
          },
        }
      );
    });
  });

  // Refresh triggers once all are set
  ScrollTrigger.refresh();




  // Mouse movement parallax for both hero and work sections
  $(".hero-section, .all-work-section").mousemove(function (e) {
    // Determine the target and movement multiplier based on section
    if ($(this).hasClass("hero-section")) {
      parallaxIt(e, ".hero_typo", -32);
    } else if ($(this).hasClass("all-work-section")) {
      parallaxIt(e, ".intro--typo, .work--typo", -96);
    }
  });

  // Parallax effect function
  function parallaxIt(e, target, movement) {
    var $this = $(e.currentTarget); // Use the specific section as the context
    var relX = e.pageX - $this.offset().left;
    var relY = e.pageY - $this.offset().top;

    // GSAP 3 syntax: 'gsap.to()' replaces 'TweenMax.to()'
    gsap.to(target, {
      duration: 1,
      x: (relX - $this.width() / 2) / $this.width() * movement,
      y: (relY - $this.height() / 2) / $this.height() * movement
    });
  }

  if ($(window).width() > 991.98) {
    let other_work_item = document.querySelectorAll(".other-work-item");


    other_work_item.forEach((el) => {
      let card__img = el.querySelector(".card__img");

      // gsap.set(card__img, {
      //   autoAlpha: 0
      // });

      gsap.to(other_work_item, {
        // zIndex: 1,
      })

      el.addEventListener("mouseenter", () => {
        gsap.to(card__img, {
          autoAlpha: 1,
          zIndex: -1,
          // clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
        })
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(card__img, {
          autoAlpha: 0,
          zIndex: 0,
          // clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"
        })
      });
      el.addEventListener('mousemove', (e) => {
        gsap.set(card__img, {
          // move images to mouse position
          // x: e.x,
          // y: e.y,
          x: e.pageX + 50,
          // transform origin of images to center
          xPercent: -50,
          yPercent: -50,
          duration: 0.2,
          ease: "ease-in-out"
        })
      })
    })
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
    const hover_cursor_text = document.querySelectorAll(".btn--primary, .btn--secondary, .card--work-item");
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