interface EditorEvent {
  name: string;
  data?: any;
}

interface Subscriber {
  eventName: string;
  handler: (evt: EditorEvent) => any;
}

export class EventEmitter {
  private subscribers: Subscriber[] = [];

  public emit(eventName: string, data?: any) {
    this.subscribers
      .filter((sub: Subscriber) => sub.eventName === eventName)
      .forEach((sub: Subscriber) =>
        sub.handler({
          name: eventName,
          data,
        }),
      );
  }

  public on(eventName: string, subscriber: (evt: EditorEvent) => any) {
    this.subscribers.push({
      eventName,
      handler: subscriber,
    });
  }
}
