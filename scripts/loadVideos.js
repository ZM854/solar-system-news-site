"use strict";
const modal = document.createElement("div");

modal.classList.add("news__video__modal");
modal.classList.add("hidden");
modal.innerHTML = `
    <div class="video__modal__overlay"></div>
    <button class="video__modal__close" aria-label="Закрыть видео">&times;</button>
    <div class="video__modal__content">
      <div class="video__modal__inner"></div>
    </div>
`;
document.body.appendChild(modal);

const modalInner = modal.querySelector(".video__modal__inner");
const closeBtn = modal.querySelector(".video__modal__close");

function openVideo(videoId) {
  modal.classList.remove("hidden");
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  iframe.allow =
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
  iframe.allowFullscreen = true;
  modalInner.innerHTML = "";
  modalInner.appendChild(iframe);
}

function closeVideo() {
  modal.classList.add("hidden");
  modalInner.innerHTML = "";
}

closeBtn.addEventListener("click", closeVideo);

modal
  .querySelector(".video__modal__overlay")
  .addEventListener("click", closeVideo);

document.querySelectorAll(".news__video").forEach((videoBlock) => {
  const videoId = videoBlock.dataset.videoId;
  const img = videoBlock.querySelector(".video__thumb");

  const placeholder = document.createElement("img");
  placeholder.src = "/images/placeholder.png";
  placeholder.classList.add("video__placeholder");

  videoBlock.prepend(placeholder);
  videoBlock.classList.add("loading");

  const handleLoad = () => {
    placeholder.remove();
    img.classList.add("loaded");
    videoBlock.classList.remove("loading");
    videoBlock.classList.add("ready");
  };

  img.addEventListener("load", handleLoad);

  if (img.complete) {
    handleLoad();
  }

  img.addEventListener("error", () => {
    img.remove();
    videoBlock.classList.remove("loading");
  });

  videoBlock.addEventListener("click", () => {
    if (videoBlock.classList.contains("ready")) {
      openVideo(videoId);
      console.log("Запуск видео");
    }
  });
});
