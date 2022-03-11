// ANIMATE THE SECTIONS

const welcomeSection = document.querySelector(".welcome-section");

window.onload = () => {
  welcomeSection.classList.add("animate-in");
};

// CLOSE THE PRELOADER
const preloader = document.querySelector(".preloader");

window.addEventListener("load", () => {
  preloader.classList.add("preloader-close");
});

// OWL CAROUSEL
$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    items: 1,
    nav: false,
    autoplay: true,
    autoplayTimeout: 6000,
    animateOut: "fadeOut",
    animateIn: "fadeIn",
    autoplayHoverPause: true,
    loop: true,
    rewind: true,
  });
});
