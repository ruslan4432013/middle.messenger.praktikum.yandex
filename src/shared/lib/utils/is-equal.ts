import { type PlainObject } from './types';

function isArray<T = unknown>(value: unknown): value is T[] {
  return Array.isArray(value);
}

function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === 'object'
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]'
  );
}

export function isArrayOrObject(value: unknown): value is PlainObject {
  return isPlainObject(value) || isArray(value);
}

export function isEqual(
  lhs: PlainObject,
  rhs: PlainObject,
) {
  // Comparing the number of keys in objects and arrays
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual(value, rightValue)) {
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}
