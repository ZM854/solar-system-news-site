"use strict";
const burgerBtn = document.querySelector(".navigation__btn");
const navigation = document.querySelector(".navigation__burger");

burgerBtn.addEventListener("click", () => {
  const isExpanded = burgerBtn.getAttribute("aria-expanded") === "true";
  console.log(isExpanded);
  burgerBtn.setAttribute("aria-expanded", String(!isExpanded));

  navigation.classList.toggle("toggled");
  burgerBtn.classList.toggle("toggled");
});
