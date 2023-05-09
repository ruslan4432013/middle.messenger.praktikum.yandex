import { type BaseController } from './controller';

import { type Component } from '../component';

export abstract class BaseView<T = unknown> {
  public readonly abstract controller: BaseController<T>;

  public abstract getComponent(): Component;

  private _component: Component;

  public show() {
    this._component.show();
  }

  public hide() {
    this._component.hide();
  }
}
