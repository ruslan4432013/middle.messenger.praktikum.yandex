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
}
