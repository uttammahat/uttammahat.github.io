$(document).ready(function (e) {

  // lenis documentation setup
  const lenis = new Lenis();

  lenis.on('scroll', (e) => {
    // console.log(e);
  })

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);


  // menu toggle
  if ($(window).width() < 991.98) {
    const toggle_menu = document.querySelector('#toggle-menu')
    const close_menu = document.querySelector('#close-menu')
    const headere_nav_body = document.querySelector('.header-nav-body')
    const tl = gsap.timeline({
      paused: true
    });

    // tl.to('.nav-link', {
    //   translateY: '48%',
    //   duration: 0.5,
    // })
    // tl.to('.header-nav-body', {
    //   translateX: '100%',
    // })
    // tl.to('.nav-container', {
    //   // width: '75%',
    // })

    // toggle_menu.addEventListener('click', () => {
    //   tl.reversed(!tl.reversed());
    // })
    // close_menu.addEventListener('click', () => {
    //   tl.reversed(!tl.reversed());
    // })

    // $(".nav-link, .logo").on('click', function (event) {
    //   tl.reversed(!tl.reversed());
    // });

    tl.to(headere_nav_body, {
        duration: 1,
        ease: "power3.out",
        x: 0
      }).to(".nav-link, .header-item", {
        opacity: 1,
        y: 0,
        duration: 0.2,
        stagger: {
          // wrap advanced options in an object
          each: 0.1,
          ease: "power1.in"
        }
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

    $(".nav-link, .logo").on('click', function (e) {
      tl.reversed(!tl.reversed());
    });
  }



  /* Add smooth scrolling to all links */
  $("a[href='#']").on('click', function (event) {
    event.preventDefault();
    var sectionID = $(this).attr("data-id");
    scrollToID("#" + sectionID, 600);
  });

  /* scroll function */
  function scrollToID(id, speed) {
    var offSet = 50;
    var targetOffset = $(id).offset().top - offSet;
    $("html,body").animate({
      scrollTop: targetOffset
    }, speed);
  }


  // update copyright year
  var updateYear = new Date().getFullYear();
  $('.updateYear').html(updateYear);



  // split type on scroll gsap animation
  gsap.registerPlugin(ScrollTrigger);

  const splitTypes = document.querySelectorAll('.reveal-type');

  splitTypes.forEach((char, i) => {

    const bg = char.dataset.bgColor
    const fg = char.dataset.fgColor

    const text = new SplitType(char, {
      types: 'chars'
    })

    gsap.fromTo(text.chars, {
      color: bg,
    }, {
      color: fg,
      duration: 0.3,
      stagger: 0.02,
      scrollTrigger: {
        trigger: char,
        start: 'top 80%',
        end: 'top 20%',
        scrub: true,
        markers: false,
        toggleActions: 'play play reverse reverse'
      }
    })
  })



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