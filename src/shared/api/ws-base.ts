import { WS_URL } from '../config';

export class WebSocketTransport {
  protected socket: WebSocket;

  constructor(url: string) {
    this.socket = new WebSocket(`${WS_URL}${url}`);
    this.socket.onopen = this.onOpen.bind(this);
    this.socket.onclose = this.onClose.bind(this);
    this.socket.onerror = this.onError.bind(this);
    this.socket.onmessage = this.onMessage.bind(this);
  }

  protected onOpen(event: Event): void;
  protected onOpen(): void {
    console.log('Соединение установлено');
  }

  protected onClose(event: CloseEvent): void;
  protected onClose(event: CloseEvent): void {
    if (event.wasClean) {
      console.log('Соединение закрыто чисто');
    } else {
      console.log('Обрыв соединения');
    }

    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  }

  protected onError(event: Event): void {
    if ('message' in event) {
      console.log('Ошибка', event.message);
    }
  }

  protected onMessage(event: MessageEvent): void {
    console.log('Получены данные', event.data);
  }

  public send(data: string): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(data);
    } else {
      console.error('WebSocket connection is not open.');
    }
  }

  public close(): void {
    this.socket.close();
  }
}
