"use strict";
async function loadNews() {
  try {
    const res = await fetch("/data/news.json");
    const news = await res.json();
    const container = document.querySelector(".news");
    const loadMoreBtn = document.getElementById("loadMoreBtn");

    let visibleCount = 5;
    const step = 5;
    function renderNews() {
      container.innerHTML = "";

      news.slice(0, visibleCount).forEach((item) => {
        const element = document.createElement("div");
        element.classList.add("news__element");
        element.innerHTML = `
        <div class="news__element__image">
          <img src="${item.image}" alt="${item.title}" />
        </div>
        <div class="news__element__content">
          <div class="news__element__text">
            <h3>${item.title}</h3>
            <p>${item.text}</p>
          </div>
          <div class="news__element__meta">
            <span class="news__element__cathegory">${item.category}</span>
            <span class="news__element__date">${item.date}</span>
          </div>
        </div
        `;
        container.appendChild(element);
      });

      if (visibleCount >= news.length) {
        loadMoreBtn.style.display = "none";
      }
    }

    loadMoreBtn.addEventListener("click", () => {
      visibleCount += step;
      renderNews();
    });

    renderNews();
  } catch (error) {
    console.log("Ошибка загрузки новостей:", error);
  }
}

loadNews();
