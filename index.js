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
const maxPage = 1;
const page = 1;
const searchQuery = "";

async function fetchCharacters() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    if (response.ok) {
      const data = await response.json();
      const results = data.results;
      cardContainer.innerHTML = "";
      results.forEach((person) => {
        const name = person.name;
        const status = person.status;
        const type = person.type;
        const occurrences = person.episode.length;
        const src = person.image;
        const newCard = createCharacterCard(
          name,
          status,
          type,
          occurrences,
          src
        );
        cardContainer.append(newCard);
      });
      return data;
    } else {
      console.error("Bad response");
    }
  } catch (Error) {
    console.error("Error occured");
  }
}

fetchCharacters();
