import { BaseModel } from '@shared/lib';

import { type LoginData } from './types';

const getInitialData = () : LoginData => ({
  login: '',
  password: '',
});

export class LoginModel extends BaseModel<LoginData> {
  public readonly data: LoginData = getInitialData();

  public printData(): void {
    console.log(this.data);
  }
}
