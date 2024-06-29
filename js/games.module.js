import { Details } from "./details.module.js";
import { Ui } from "./ui.module.js";

export class Gaming {
  constructor() {
    this.ui = new Ui();
    this.category = "mmorpg";
    this.init();
  }

  init() {
    this.getGames(this.category);
    this.bindMenuEvents();
  }

  bindMenuEvents() {
    document.querySelectorAll(".menu a").forEach((link) => {
      link.addEventListener("click", (e) => {
        this.handleMenuClick(e);
      });
    });
  }

  handleMenuClick(e) {
    document.querySelector(".menu .active").classList.remove("active");
    e.target.classList.add("active");
    this.getGames(e.target.dataset.category);
  }

  async getGames(category) {
    this.showLoading();
    const options = this.getApiOptions();
    const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, options);
    const response = await api.json();
    this.ui.displayData(response);
    this.startEvent();
    this.hideLoading();
  }

  getApiOptions() {
    return {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "b7ddeaba2emsh4c7f9a279de19b4p17f62fjsn9ef33d17e7d9",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
  }

  showLoading() {
    document.querySelector(".loading").classList.remove("d-none");
  }

  hideLoading() {
    document.querySelector(".loading").classList.add("d-none");
  }

  startEvent() {
    document.querySelectorAll(".card").forEach((item) => {
      item.addEventListener("click", () => {
        this.handleCardClick(item);
      });
    });
  }

  handleCardClick(item) {
    const id = item.dataset.id;
    this.showDetails(id);
  }

  showDetails(idGame) {
    const details = new Details(idGame);
    document.querySelector(".games").classList.add("d-none");
    document.query
    Selector(".allDetails").classList.remove("d-none");
  }
  
}