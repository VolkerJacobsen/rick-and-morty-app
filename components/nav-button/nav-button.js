export function createButton(name) {
  const button = document.createElement("button");
  button.classList.add("button", `button--${name}`);
  button.setAttribute("data-js", `button-${name}`);
  if (name === "prev") {
    button.textContent = "previous";
  } else {
    button.textContent = name;
  }
  return button;
}
