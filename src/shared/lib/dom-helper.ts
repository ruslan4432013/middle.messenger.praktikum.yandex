import { Component } from './component';
import { makeId } from './make-id';
import { type BaseView } from './mvc';

const PREFIX = 'listener';

/**
 * Помощник для навешивания событий на html-элемент
 */
export const $ = <E extends HTMLElement, K extends keyof HTMLElementEventMap>(
  element: E,
) => ({
    on(type: K, listener: EventListenerOrEventListenerObject) {
      const id = makeId(5);
      element.dataset[PREFIX] = id;
      setTimeout(() => {
        const elementInDom = document.querySelector(`[data-${PREFIX}="${id}"]`) as E;
        elementInDom.addEventListener(type, listener);
        delete elementInDom.dataset[PREFIX];
      });
    },
  });

export function render(query: string, block: Component | BaseView) {
  const root = document.querySelector(query)!;
  if (block instanceof Component) {
    root.appendChild(block.getContent());
    block.dispatchComponentDidMount();
  } else {
    block.mount();
  }
}
