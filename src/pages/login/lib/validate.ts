import { validate } from '@shared/lib';

import { type LoginData } from '../model';

type IsCorrect = {
  isCorrect: true
};

type NotCorrect = {
  isCorrect: false
  message: string
};

export const isValidLoginData = (data: LoginData): IsCorrect | NotCorrect => {
  const isLoginValid = validate.login(data.login);
  const isPasswordValid = validate.password(data.password);
  const isCorrect = isLoginValid && isPasswordValid;
  if (isCorrect) {
    return { isCorrect };
  }
  return {
    isCorrect,
    message: isLoginValid ? 'Password not correct' : 'Login not correct',
  };
};
