import { BaseController } from '@shared/lib';

import { SignInModel } from './sign-in-model';
import { type SignInData } from './types';

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

export * from './types';
