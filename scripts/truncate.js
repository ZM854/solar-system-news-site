"use strict";

function truncate(str, maxLength) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength - 1) + "...";
  } else {
    return str;
  }
}

const paragraphs = document.querySelectorAll(".news__element__text p");

const MAX_LENGTH = 50;

paragraphs.forEach((p) => {
  const originalText = p.textContent.trim();
  p.textContent = truncate(originalText, MAX_LENGTH);
});
