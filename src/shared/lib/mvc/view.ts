import { type BaseController } from './controller';

import { type Component } from '../component';

export abstract class BaseView<T = unknown> {
  public readonly abstract controller: BaseController<T>;

  public readonly abstract root: Element;

  protected abstract getComponent(): Component;

  public mount() {
    this.root.innerHTML = '';
    const component = this.getComponent();
    this.root.appendChild(component.getContent());
  }
}
