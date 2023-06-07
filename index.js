import { createCharacterCard } from "./components/card/card.js";
import { createButton } from "./components/nav-button/nav-button.js";
import { createPagination } from "./components/nav-pagination/nav-pagination.js";
import { createSearchbar } from "./components/search-bar/search-bar.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = createSearchbar();
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = createButton("prev");
const nextButton = createButton("next");
const pagination = createPagination();

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

searchBarContainer.append(searchBar);
navigation.append(prevButton);
navigation.append(pagination);
navigation.append(nextButton);

async function fetchCharacters() {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`
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

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  searchQuery = data.query;
  page = 1;
  fetchCharacters();
});
