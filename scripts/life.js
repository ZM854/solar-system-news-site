"use strict";
const items = document.querySelectorAll(".life__item");
const currentBg = document.querySelector(".life__bg--current");
const nextBg = document.querySelector(".life__bg--next");

let activeBg = currentBg;
let next = nextBg;
let currentImage = null;

const changeBackground = (newImage) => {
  if (newImage === currentImage) return;

  currentImage = newImage;

  next.style.backgroundImage = `url(${newImage})`;

  next.style.opacity = 1;
  activeBg.style.opacity = 0;

  const temp = activeBg;
  activeBg = next;
  next = temp;
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bg = entry.target.getAttribute("data-bg");
        changeBackground(bg);
      }
    });
  },
  {
    threshold: 0.6,
  }
);

items.forEach((item) => observer.observe(item));
