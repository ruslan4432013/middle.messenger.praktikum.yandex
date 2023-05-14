import { sessionApi } from '@entities/session';
import { BaseModel } from '@shared/lib';

import { type SignInData } from './types';

const getInitialData = (): SignInData => ({
  login: '',
  password: '',
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
});

export class SignInModel extends BaseModel<SignInData> {
  public data = getInitialData();

  public printValues() {
    console.log(this.data);
  }

  public async signUp() {
    const { last_name: lastName, ...other } = this.data;
    const res = await sessionApi.signUpUser({
      second_name: lastName,
      ...other,
    });
    return res;
  }
}
