import { EventBus } from '../event-bus';
import { set } from '../utils';

export enum StoreEvents {
  Updated = 'updated',
}

class Store extends EventBus {
  private _state: Partial<StateStore> = {};

  get state() {
    return this._state;
  }

  public set(path: string, value: unknown) {
    set(this._state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

export const store = new Store();
