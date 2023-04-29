import { BaseController } from '@shared/lib';

import { LoginModel } from './login-model';
import { type LoginData } from './types';

export class LoginController extends BaseController<LoginData> {
  public readonly model = new LoginModel();

  public submit() {
    this.model.printData();
  }

  public changeField(field: keyof LoginData, text: string) {
    this.model.data[field] = text;
  }
}

export * from './types';
