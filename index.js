import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let page = 1;
const searchQuery = "";

async function fetchCharacters() {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );
    if (response.ok) {
      const data = await response.json();

      maxPage = data.info.pages;
      pagination.textContent = page + " / " + maxPage;
      const persons = data.results;
      cardContainer.innerHTML = "";
      persons.forEach((person) => {
        const newCard = createCharacterCard(person);
        cardContainer.append(newCard);
      });
    } else {
      console.error("Bad response");
    }
  } catch (error) {
    console.error("Error occured");
  }
}

prevButton.addEventListener("click", () => {
  if (page > 1) {
    page--;
    fetchCharacters();
  }
});

nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page++;
    fetchCharacters();
  }
});

fetchCharacters();
