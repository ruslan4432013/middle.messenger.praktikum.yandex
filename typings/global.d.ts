export {};

type Events = Record<keyof DocumentEventMap, EventListenerOrEventListenerObject>;

declare global {
  type PropType = {
    events?: Partial<Events>,
    attr?: Record<string, string>
    [prop: string]: unknown
  };
}
