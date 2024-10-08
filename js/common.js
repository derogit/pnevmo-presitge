$(window).on("load", function () {
  setTimeout(() => {
    $("html").addClass("loaded");
  }, 1000);
});

$(document).ready(function () {
  // (new ldLoader({root: ".ldld.full"})).on();
  domShuffle();
  if (screen.width > 768) {
    var scene = document.getElementById("scene");
    var parallaxInstance = new Parallax(scene);
  }

  $(".js-more-faq").on("click", function (e) {
    e.preventDefault();

    $(".faq-list .ts-faq-accordion-item.hidden").slideDown();
    $(this).fadeOut();
  });

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
      992: {
        slidesPerView: 1,
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
        slidesPerView: 2,
        // direction: 'horizontal',
      },
      480: {
        slidesPerView: 1,
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
      992: {
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 3,
      },
      480: {
        slidesPerView: 2,
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

    if ($(".mobile-menu").hasClass("is-active")) {
      $(".header-toggle").toggleClass("is-active");
      $(".mobile-menu").toggleClass("is-active");
      $(".header").toggleClass("is-active");
    }

    var sc = $(this).attr("href"),
      dn = $(sc).offset().top;
    $("html, body").animate({ scrollTop: dn + scrollCorrection }, 1000);
  });

  $("form").submit(function (e) {
    var $form = $(this);
    new ldLoader({ root: ".ldld.full" }).on();
    $.ajax({
      type: "POST",
      url: "send.php",
      data: $form.serialize(),
    })
      .done(function () {
        // alert("Успешно");
        $form.find("input").val("");
        $.fancybox.close();
        $.fancybox.open($("#thxpopup"));
        new ldLoader({ root: ".ldld.full" }).off();
      })
      .fail(function () {
        alert("Ошибка! Повторите попытку позже");
        new ldLoader({ root: ".ldld.full" }).off();
      });
    e.preventDefault();
  });
});

const appHeight = () => {
  const doc = document.documentElement;
  doc.style.setProperty("--app-height", `${window.innerHeight}px`);

  domShuffle();
};
window.addEventListener("resize", appHeight);

function domShuffle() {
  console.log("domShuffle");
  if (screen.width < 992) {
    $(".header__menu").appendTo($(".mobile-menu__menu"));
    $(".header__langs").insertAfter($(".mobile-menu__menu"));
  } else {
    $(".header__menu").insertAfter($(".header__logo"));
    $(".header__langs").insertAfter($(".header__menu"));
  }
}

// window on scroll add to header class
window.onscroll = function () {
  if (window.pageYOffset > 20) {
    $("header").addClass("--scrolled");
  } else {
    $("header").removeClass("--scrolled");
  }
  document.documentElement.style.setProperty("--app-scroll", `${window.pageYOffset}px`);
};
