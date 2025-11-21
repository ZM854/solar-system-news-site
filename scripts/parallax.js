"use strict";

const parallax = document.querySelectorAll(".parallax");

const speed = 0.2;

let scrollY = 0;
let currentY = 0;

window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
});

function animate() {
  currentY += (scrollY - currentY) * 0.1;

  parallax.forEach((p) => {
    p.style.backgroundPositionY = currentY * speed + "px";
  });
  requestAnimationFrame(animate);
}

animate();
