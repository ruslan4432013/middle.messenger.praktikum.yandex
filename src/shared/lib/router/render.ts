import { type BaseView } from '..';
import { Component } from '../component';

export function render(query: string, block: Component | BaseView) {
  const root = document.querySelector(query)!;
  root.innerHTML = '';
  if (block instanceof Component) {
    root.appendChild(block.getContent());
    block.dispatchComponentDidMount();
  } else {
    const { component } = block;
    root.appendChild(component.getContent());
    component.dispatchComponentDidMount();
  }
}
