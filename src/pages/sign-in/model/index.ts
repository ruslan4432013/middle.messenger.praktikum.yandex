import { type SignInData } from '@pages/sign-in/model/types';
import { BaseController } from '@shared/lib';

import { SignInModel } from './sign-in-model';

export class SignInController extends BaseController<SignInData> {
  public readonly model = new SignInModel();

  public onChange(field: keyof SignInData, text: string) {
    this.model.data[field] = text;
  }

  public onSubmit(evt: Event) {
    evt.preventDefault();
    this.model.printValues();
  }
}
