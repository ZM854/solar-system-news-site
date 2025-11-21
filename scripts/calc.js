"use strict";
const stats = document.querySelectorAll(".calc__statistics__item h3");

const events = {
  comets: [new Date("2026-07-10T00:00:00Z")],
  eclipses: [
    new Date("2026-08-12T00:00:00Z"),
    new Date("2027-08-02T00:00:00Z"),
    new Date("2028-01-26T00:00:00Z"),
  ],
  starshipFlights: [new Date("2026-02-15T00:00:00Z")],
  issFlights: [
    new Date("2025-12-10T00:00:00Z"),
    new Date("2026-03-22T00:00:00Z"),
  ],
};

const voyager1Launch = new Date("1977-09-05T12:56:00Z");
const voyager2Launch = new Date("1977-08-20T14:29:00Z");

const voyager1Speed = 17.0;
const voyager2Speed = 15.4;
const lightSpeed = 299792;
const galacticSpeed = 230;

const radioStart = new Date("1895-01-01T00:00:00Z");
const siteOpenTime = Date.now();

function formatNumber(num) {
  return num.toLocaleString("ru-RU");
}

function getNextDate(dates) {
  const now = new Date();
  const future = dates.filter((d) => d > now);
  return future.length ? future[0] : null;
}

function daysUntil(date) {
  const diff = date - new Date();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function voyagerDistance(launchDate, speedKmPerSec) {
  const secondsSinceLaunch = (Date.now() - launchDate.getTime()) / 1000;
  return secondsSinceLaunch * speedKmPerSec;
}

function radioSignalDistance() {
  const secondsSinceRadio = (Date.now() - radioStart.getTime()) / 1000;
  return secondsSinceRadio * lightSpeed;
}

function distanceSinceSiteOpened() {
  const seconds = (Date.now() - siteOpenTime) / 1000;
  return seconds * galacticSpeed;
}

function updateStats() {
  const nextComet = getNextDate(events.comets);
  stats[0].textContent = nextComet ? daysUntil(nextComet) + " дней" : "0 дней";

  const nextEclipse = getNextDate(events.eclipses);
  stats[1].textContent = nextEclipse
    ? daysUntil(nextEclipse) + " дней"
    : "0 дней";

  const nextStarship = getNextDate(events.starshipFlights);
  stats[2].textContent = nextStarship
    ? daysUntil(nextStarship) + " дней"
    : "0 дней";

  const nextISS = getNextDate(events.issFlights);
  stats[3].textContent = nextISS ? daysUntil(nextISS) + " дней" : "0 дней";

  const v1 = voyagerDistance(voyager1Launch, voyager1Speed);
  const v2 = voyagerDistance(voyager2Launch, voyager2Speed);
  const radio = radioSignalDistance();
  const galactic = distanceSinceSiteOpened();

  stats[4].textContent = formatNumber(Math.floor(v1)) + " км";
  stats[5].textContent = formatNumber(Math.floor(v2)) + " км";
  stats[6].textContent = formatNumber(Math.floor(radio)) + " км";
  stats[7].textContent = formatNumber(Math.floor(galactic)) + " км";
}

updateStats();
setInterval(updateStats, 1000);
