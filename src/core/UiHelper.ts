const logContainer = document.getElementById("log-container") as HTMLDivElement;

// Function to log messages
export function sendMessageToLog(message: string): void {
  // Create a new div element for the log message
  const newLog = document.createElement("div");
  newLog.textContent = message;

  // Append the new log message to the log container
  logContainer.insertBefore(newLog, logContainer.firstChild);
}
