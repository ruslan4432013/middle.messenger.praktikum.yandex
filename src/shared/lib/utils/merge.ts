type Primitive = string | number | boolean | null | undefined;

type MergeValues<T, U> = T extends Primitive | Function | symbol
  ? U
  : U extends Primitive | Function | symbol
    ? T
    : T extends object
      ? U extends object
        ? { [K in keyof (T & U)]?: K extends keyof T
          ? K extends keyof U
            ? MergeValues<T[K], U[K]>
            : T[K]
          : K extends keyof U
            ? U[K]
            : never }
        : T
      : U;

export function merge<
  L extends Record<string, any>,
  R extends Record<string, any>>(lhs: L, rhs: R): MergeValues<L, R> {
  for (const key in rhs) {
    if (!rhs.hasOwnProperty(key)) {
      continue;
    }

    try {
      if (typeof rhs[key] === 'object') {
        rhs[key] = merge(lhs[key], rhs[key]);
      } else {
        lhs[key] = rhs[key] as any;
      }
    } catch (e) {
      lhs[key] = rhs[key] as any;
    }
  }

  return lhs as MergeValues<L, R>;
}
