export type EventHandler<P = any> = (...payload: P[]) => void;

export interface IEventBus {
  on(key: string, handler: EventHandler): void

  off(key: string, handler: EventHandler): void

  emit(key: string, ...payload: Parameters<EventHandler>): void
}
