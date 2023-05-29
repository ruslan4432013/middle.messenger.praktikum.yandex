import { Path } from '@shared/config';
import { loginRequired } from '@shared/lib/decorators';

import { getMe } from './get-me';

const inSystem = async () => {
  try {
    const { id } = await getMe();
    if (id) {
      return true;
    }
  } catch (e) {
    return false;
  }
  return false;
};

const notInSystem = async () => {
  const res = await inSystem();
  return !res;
};

export const requiredAuth = loginRequired(inSystem, Path.LOGIN);

export const notForAuth = loginRequired(notInSystem, Path.HOME);
