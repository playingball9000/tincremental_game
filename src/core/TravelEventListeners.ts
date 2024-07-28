import { selectTravelOption } from "./MapManager";

export function addTravelButtonsListeners() {
  const options = document.querySelectorAll(".travel-button");
  options.forEach((option) => {
    option.addEventListener("click", () => {
      selectTravelOption(option.textContent);
    });
  });
}
