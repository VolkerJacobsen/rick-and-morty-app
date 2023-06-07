export function createSearchbar() {
  const bar = document.createElement("form");
  bar.classList.add("search-bar");
  bar.setAttribute("data-js", "search-bar");

  const input = document.createElement("input");
  input.classList.add("search-bar__input");
  input.setAttribute("name", "query");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "search characters");
  input.setAttribute("aria-label", "character name");

  const button = document.createElement("button");
  button.classList.add("search-bar__button");
  button.setAttribute("aria-label", "search for character");

  const img = document.createElement("img");
  img.classList.add("search-bar__icon");
  img.setAttribute("src", "../../assets/magnifying-glass.png");

  button.append(img);
  bar.append(input, button);

  return bar;
}
