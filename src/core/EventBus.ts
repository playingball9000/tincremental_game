export class EventBus {
  private listeners: { [event: string]: ((data: any) => void)[] } = {};

  public subscribe(event: string, listener: (data: any) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
    console.log("Updated Listeners: ", this.listeners);
  }

  public publish(event: string, data: any): void {
    console.log("publis to listeners:", this.listeners);
    if (!this.listeners[event]) return;
    this.listeners[event].forEach((listener) => listener(data));
  }
}

export const eventBus = new EventBus();
