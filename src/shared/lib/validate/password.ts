export const password = (input: string): boolean => {
  // Проверка длины строки
  if (input.length < 8 || input.length > 40) {
    return false;
  }

  // Проверка на наличие хотя бы одной заглавной буквы и цифры
  if (!(/[A-Z]/.test(input) && /\d/.test(input))) {
    return false;
  }

  return true;
};
