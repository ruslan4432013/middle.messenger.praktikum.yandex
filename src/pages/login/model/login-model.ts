import { sessionApi } from '@entities/session';
import { Path } from '@shared/config';
import { BaseModel, store, router } from '@shared/lib';
import { toast } from '@shared/ui/toast';

import { type LoginData } from './types';

import { isValidLoginData } from '../lib';

const getInitialData = (): LoginData => ({
  login: '',
  password: '',
});

export class LoginModel extends BaseModel<LoginData> {
  public readonly data: LoginData = getInitialData();

  public async login() {
    try {
      const validateData = isValidLoginData(this.data);
      if (!validateData.isCorrect) {
        throw new Error(validateData.message);
      }
      await sessionApi.login(this.data);
      const user = await sessionApi.getMe();
      store.set('user', user);
      router.go(Path.HOME);
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
    }
  }
}
