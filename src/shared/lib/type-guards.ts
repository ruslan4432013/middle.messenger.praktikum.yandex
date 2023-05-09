type ObjWithValue = {
  value: string
};

type CorrectPopUpState = {
  currentTarget: {
    location: {
      pathname: string
    }
  }
};

/**
 * Проверяет, что у объекта event.target есть значение value:
 * (event: Event) => isEvtTargetWithValue(event) event.target.value!
 */
export const isEvtTargetWithValue = (target: unknown): target is ObjWithValue => !!(target && typeof target === 'object' && 'value' in target);

export const isCorrectPopStateEvent = (evt: unknown): evt is CorrectPopUpState => (
  typeof evt === 'object'
    && evt != null
    && 'currentTarget' in evt
    && evt.currentTarget instanceof Object
    && 'location' in evt.currentTarget
    && evt.currentTarget.location instanceof Object
    && 'pathname' in evt.currentTarget.location
    && typeof evt.currentTarget.location.pathname === 'string'
);
