import { type BaseController } from './controller';

import { type Component } from '../component';

export abstract class BaseView<T = unknown> {
  public readonly abstract controller: BaseController<T>;

  protected abstract getComponent(): Component;

  private _component: Component;

  constructor() {
    this._component = this.getComponent();
  }

  get component() {
    return this._component;
  }

  public show() {
    this._component.show();
  }

  public hide() {
    this._component?.hide();
  }
}
