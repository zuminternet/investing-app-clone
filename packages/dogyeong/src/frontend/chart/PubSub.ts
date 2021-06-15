export default abstract class PubSub {
  protected listeners: any[] = [];

  public subscribe(listener) {
    this.listeners.push(listener);
  }

  protected publish(...args) {
    this.listeners.forEach((listener) => listener(...args));
  }
}
