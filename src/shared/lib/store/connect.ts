import { store, StoreEvents } from './store';

import { type Indexed } from '../types';
import { isEqual } from '../utils';

export function connect(mapStateToProps: (state: typeof store.state) => Indexed) {
  return function <
    T extends { new (...args: any[]): { setProps: (props: PropType) => void } },
  >(constructor: T) {
    return class extends constructor {
      constructor(...props: any[]) {
        // сохраняем начальное состояние
        let state = mapStateToProps(store.state);

        super(...props, { ...state });

        // подписываемся на событие
        store.on(StoreEvents.Updated, () => {
          // при обновлении получаем новое состояние
          const newState = mapStateToProps(store.state);

          // если что-то из используемых данных поменялось, обновляем компонент
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }

          // не забываем сохранить новое состояние
          state = newState;
        });
      }
    };
  };
}
