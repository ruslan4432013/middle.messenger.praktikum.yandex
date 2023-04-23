export const login = (input: string) => {
  if (input.length < 3 || input.length > 20) {
    return false;
  }

  // Проверка на наличие специальных символов, кроме дефиса и нижнего подчеркивания
  if (/[^a-zA-Z0-9_-]/.test(input)) {
    return false;
  }

  // Проверка на начало и конец строки с дефиса или нижнего подчеркивания
  if (/^[_-]|[_-]$/.test(input)) {
    return false;
  }

  // Проверка на наличие только цифр
  if (/^\d+$/.test(input)) {
    return false;
  }

  return true;
};
