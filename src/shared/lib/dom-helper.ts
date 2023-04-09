import { makeId } from '@shared/lib/make-id'


const PREFIX = 'listener'

/**
* Помощник для навешивания событий на html-элемент
*/
export const $ = <E extends HTMLElement, K extends keyof HTMLElementEventMap>(
  element: E
) => {
  return {
    on(type: K, listener: EventListenerOrEventListenerObject) {
      const id = makeId(5)
      element.dataset[PREFIX] = id
      setTimeout(() => {
        const elementInDom = document.querySelector(`[data-${PREFIX}="${id}"]`) as E
        elementInDom.addEventListener(type, listener)
        delete elementInDom.dataset[PREFIX]
      })
    }
  }
}
