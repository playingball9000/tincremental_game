import { TRAVEL_BUTTON_NAME } from "../constants/Constants";
import { Location } from "../domain/Location";

const logContainer = document.getElementById("log-container") as HTMLDivElement;

// Function to log messages
export function sendMessageToLog(message: string): void {
  // Create a new div element for the log message
  const newLog = document.createElement("div");
  newLog.textContent = message;

  // Append the new log message to the log container
  logContainer.insertBefore(newLog, logContainer.firstChild);
}

/**
 * Example of what the div looks like
 * <div class="game-container">
        <p>Choose an option:</p>
        <div class="travel-buttons">
          <div class="travel-button-container">
            <div class="travel-button" id="travelHome">Home</div>
          </div>
          <div class="travel-button-container">

            <div class="travel-button" id="travelCity">City</div>
          </div>

          <div class="travel-button-container">
            <div class="travel-button" id="travelTown">Town</div>
          </div>

        </div>
        <p id="selected-travel-button">Selected option: None</p>
      </div>

 * @param locations 
 * @param containerId 
 * @returns 
 */
export function generateTravelButtonsDiv(
  locations: Location[],
  containerId: string
) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with ID ${containerId} not found`);
    return;
  }

  const gameContainer = document.createElement("div");
  gameContainer.classList.add("game-container");

  const chooseOptionP = document.createElement("p");
  chooseOptionP.textContent = "Choose an option:";
  gameContainer.appendChild(chooseOptionP);

  const travelButtonsDiv = document.createElement("div");
  travelButtonsDiv.classList.add("travel-buttons");

  locations.forEach((location) => {
    const travelButtonContainer = document.createElement("div");
    travelButtonContainer.classList.add("travel-button-container");

    const travelButton = document.createElement("div");
    travelButton.classList.add(TRAVEL_BUTTON_NAME);
    travelButton.id = `travel${location.name.replace(/\s+/g, "")}`;
    travelButton.textContent = location.name;

    travelButtonContainer.appendChild(travelButton);
    travelButtonsDiv.appendChild(travelButtonContainer);
  });

  gameContainer.appendChild(travelButtonsDiv);

  const selectedTravelButtonP = document.createElement("p");
  selectedTravelButtonP.id = "selected-travel-button";
  selectedTravelButtonP.textContent = "Selected option: None";
  gameContainer.appendChild(selectedTravelButtonP);

  container.insertBefore(gameContainer, container.firstChild);
}
