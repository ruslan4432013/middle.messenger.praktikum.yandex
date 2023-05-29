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

type PlainObject<T = unknown> = {
  [K in string]: T
};

export function isPlainObject(val: unknown): val is PlainObject {
  return typeof val === 'object'
    && val !== null
    && val.constructor === Object
    && Object.prototype.toString.call(val) === '[object Object]';
}

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

export const isQueryStingData = (
  data: unknown,
): data is Record<string, (string[] | string | number)> => {
  if (!isPlainObject(data)) return false;
  for (const value of Object.values(data)) {
    if (typeof value !== 'string' && typeof value !== 'number' && !Array.isArray(value)) {
      return false;
    }
  }
  return true;
};
