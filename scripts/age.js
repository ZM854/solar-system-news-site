"use strict";
let intervalId = null;

document.querySelector(".age__submit").addEventListener("click", () => {
  const dayInput = document.getElementById("age__day");
  const monthInput = document.getElementById("age__month");
  const yearInput = document.getElementById("age__year");

  const day = Math.floor(+dayInput.value);
  const month = Math.floor(+monthInput.value);
  const year = Math.floor(+yearInput.value);

  if (Number.isNaN(day) || Number.isNaN(month) || Number.isNaN(year)) {
    alert("Введите корректные числа для даты рождения.");
    return;
  }

  if (day <= 0 || month <= 0 || year <= 0) {
    alert("Дата не может содержать нули или отрицательные значения.");
    return;
  }

  if (month > 12) {
    alert("Месяц должен быть в диапазоне от 1 до 12.");
    return;
  }

  const birthDate = new Date(year, month - 1, day);
  if (
    birthDate.getFullYear() !== year ||
    birthDate.getMonth() !== month - 1 ||
    birthDate.getDate() !== day
  ) {
    alert("Такой даты не существует. Проверьте правильность ввода.");
    return;
  }

  const now = new Date();

  if (birthDate > now) {
    alert("Дата рождения не может быть из будущего.");
    return;
  }

  if (year < 1900) {
    alert("Дата рождения слишком ранняя — допустимо с 1900 года.");
    return;
  }

  if (intervalId) clearInterval(intervalId);

  const stats = document.querySelectorAll(".age__statistics__item h3");

  function updateStats() {
    const now = new Date();
    const livedMs = now - birthDate;
    const livedDays = livedMs / (1000 * 60 * 60 * 24);

    const daysOnEarth = livedDays;
    const fullMoons = livedDays / 29.53;
    const orbitAroundSun = livedDays * 2_573_424;
    const galacticTravel = livedDays * 19_872_000;
    const meteors = livedDays * 1_468_800;
    const comets = livedDays * 0.0411;

    const issStart = new Date(1998, 10, 20);
    const issDays =
      birthDate > issStart
        ? (now - birthDate) / (1000 * 60 * 60 * 24)
        : (now - issStart) / (1000 * 60 * 60 * 24);
    const issOrbits = issDays * 16;

    const launchStart = new Date(1957, 9, 4);
    const spacecraftDays =
      birthDate > launchStart
        ? (now - birthDate) / (1000 * 60 * 60 * 24)
        : (now - launchStart) / (1000 * 60 * 60 * 24);
    const spacecrafts = spacecraftDays * 0.33;

    const values = [
      daysOnEarth,
      fullMoons,
      orbitAroundSun,
      galacticTravel,
      meteors,
      comets,
      spacecrafts,
      issOrbits,
    ];

    stats.forEach((el, i) => {
      el.textContent = values[i].toLocaleString("ru-RU", {
        maximumFractionDigits: 0,
      });
    });
  }

  updateStats();
  intervalId = setInterval(updateStats, 1000);
});
