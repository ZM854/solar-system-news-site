"use strict";
const carousel = document.querySelector(".spacecraft__carousel__container");
const slides = document.querySelectorAll(".spacecraft__carousel__element");
const btnLeft = document.querySelector(".scroll_left__btn");
const btnRight = document.querySelector(".scroll_right__btn");
const mobileTexts = document.querySelectorAll(".mobile__text__element");
const navDots = document.querySelectorAll(".spacecraft__carousel__nav a");

let currentIndex = 0;

function updateMobileText() {
  const isMobile = window.matchMedia("(max-width: 48em)").matches;
  mobileTexts.forEach((el, i) => {
    el.style.display = isMobile && i === currentIndex ? "block" : "none";
  });
}

function updateActiveDot() {
  navDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

function scrollToIndex(index) {
  const slide = slides[index];
  if (slide) {
    const offset = index * carousel.clientWidth;
    carousel.scrollTo({ left: offset, behavior: "smooth" });
    currentIndex = index;
    updateMobileText();
    updateActiveDot();
  }
}

btnRight.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.length;
  scrollToIndex(currentIndex);
});

btnLeft.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  scrollToIndex(currentIndex);
});

navDots.forEach((dot, i) => {
  dot.addEventListener("click", (e) => {
    e.preventDefault();
    currentIndex = i;
    scrollToIndex(currentIndex);
  });
});

let scrollTimeout;
carousel.addEventListener("scroll", () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const slideWidth = carousel.clientWidth;
    const newIndex = Math.round(carousel.scrollLeft / slideWidth);
    if (newIndex !== currentIndex) {
      currentIndex = newIndex;
      updateMobileText();
      updateActiveDot();
    }
  }, 150);
});

updateMobileText();
updateActiveDot();
window.addEventListener("resize", updateMobileText);
