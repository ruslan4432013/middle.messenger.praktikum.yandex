export const name = (str: string): boolean => {
  const stringRegex = /^[а-яА-Яa-zA-Z][а-яА-Яa-zA-Z\-]*$/;

  return stringRegex.test(str);
};
