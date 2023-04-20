import { type Component } from '@shared/lib/component';
import { makeId } from '@shared/lib/make-id';

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

export function render(query: string, block: Component) {
  const root = document.querySelector(query)!;

  root.appendChild(block.getContent());

  block.dispatchComponentDidMount();

  return root;
}
