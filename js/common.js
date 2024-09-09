$(window).on("load", function () {
  setTimeout(() => {
    $("html").addClass("loaded");
  }, 1000);
});

$(document).ready(function () {
  // (new ldLoader({root: ".ldld.full"})).on();

  var scene = document.getElementById("scene");
  var parallaxInstance = new Parallax(scene);

  appHeight();
  const doc = document.documentElement;
  doc.style.setProperty("--app-const-height", `${window.innerHeight}px`);

  var swiperReviews = new Swiper(".swiper-reviews", {
    loop: false,
    slidesPerView: 2,
    spaceBetween: 35,
    // autoHeight: true,
    navigation: {
      nextEl: ".swiper-reviews__next",
      prevEl: ".swiper-reviews__prev",
    },
    breakpoints: {
      768: {
        // direction: 'horizontal',
      },
    },
  });

  var swiperGallery = new Swiper(".swiper-gallery", {
    loop: false,
    slidesPerView: 3,
    spaceBetween: 25,
    autoHeight: true,
    navigation: {
      nextEl: ".swiper-gallery__next",
      prevEl: ".swiper-gallery__prev",
    },
    breakpoints: {
      768: {
        // direction: 'horizontal',
      },
    },
  });

  var swiperExamples = new Swiper(".swiper-examples", {
    loop: false,
    slidesPerView: 1,
    spaceBetween: 10,
    autoHeight: true,
    navigation: {
      nextEl: ".swiper-examples__next",
      prevEl: ".swiper-examples__prev",
    },
    breakpoints: {
      768: {
        // direction: 'horizontal',
      },
    },
  });

  var swiperMainSubs = new Swiper(".swiper-main-sub", {
    loop: false,
    slidesPerView: 5,
    spaceBetween: 30,
    autoHeight: true,
    navigation: {
      nextEl: ".swiper-main-sub__next",
      prevEl: ".swiper-main-sub__prev",
    },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      768: {
        // direction: 'horizontal',
      },
    },
  });

  $(".ts-faq-item-question").on("click", function () {
    $(this).parent(".ts-faq-accordion-item").toggleClass("is-active");
    $(this).next(".ts-faq-item-content").slideToggle();
  });

  $(".header-toggle").on("click", function (e) {
    e.preventDefault();
    $(this).toggleClass("is-active");
    $(".mobile-menu").toggleClass("is-active");
    $(".header").toggleClass("is-active");
  });

  $("a.smoothscroll").on("click", function (event) {
    event.preventDefault();

    let scrollCorrection = 0;

    if ($(this).data("scroll-correction")) {
      scrollCorrection = $(this).data("scroll-correction");
    }
    if (screen.width < 768 && $(this).data("scroll-correction-mobile")) {
      scrollCorrection = $(this).data("scroll-correction-mobile");
    }

    var sc = $(this).attr("href"),
      dn = $(sc).offset().top;
    $("html, body").animate({ scrollTop: dn + scrollCorrection }, 1000);
  });

  $(".ajax-form").submit(function (e) {
    var $form = $(this);
    $.ajax({
      type: $form.attr("method"),
      url: $form.attr("action"),
      data: $form.serialize(),
    })
      .done(function () {
        alert("Успешно");
      })
      .fail(function () {
        alert("Ошибка! Повторите попытку позже");
      });
    e.preventDefault();
  });
});

const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--app-height", `${window.innerHeight}px`);
};
window.addEventListener("resize", appHeight);
