export const debounce = <T = unknown>(cb: (...args: T[]) => void, ms: number) => {
  let timeoutId: NodeJS.Timeout | null = null;
  return (...args: T[]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      cb(...args);
    }, ms);
  };
};
