import { Ui } from "./ui.module.js";

export class Details {
  constructor(id) {
    this.ui = new Ui();
    this.id = id;
    this.bindCloseButton();
    this.getDetails();
  }

  bindCloseButton() {
    document.getElementById("btnClose").addEventListener("click", () => {
      this.hideDetails();
    });
  }

  hideDetails() {
    document.querySelector(".allDetails").classList.add("d-none");
    document.querySelector(".games").classList.remove("d-none");
  }

  getDetails() {
    this.showLoading();
    const options = this.getApiOptions();
    fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${this.id}`, options)
      .then((response) => response.json())
      .then((response) => this.ui.displayDetails(response))
      .catch((err) => console.error(err))
      .finally(() => {
        this.hideLoading();
      });
  }

  getApiOptions() {
    return {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "b7ddeaba2emsh4c7f9a279de19b4p17f62fjsn9ef33d17e7d9",
        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
      },
    };
  }

  showLoading() {
    document.querySelector(".loading").classList.remove("d-none");
  }

  hideLoading() {
    document.querySelector(".loading").classList.add("d-none");
  }
}