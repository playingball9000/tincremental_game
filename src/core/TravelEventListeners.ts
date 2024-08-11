import { TRAVEL_BUTTON_NAME } from "../constants/Constants";
import { selectTravelOption } from "./MapManager";

export function addTravelButtonsListeners() {
  const options = document.querySelectorAll("." + TRAVEL_BUTTON_NAME);
  options.forEach((option) => {
    option.addEventListener("click", () => {
      selectTravelOption(option.textContent);
    });
  });
}
