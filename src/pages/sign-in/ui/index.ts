import { BaseView } from '@shared/lib';

import { SignInPage } from './block';

import { SignInController } from '../model';

export class SignInPageView extends BaseView {
  public readonly controller = new SignInController();

  public getComponent() {
    return new SignInPage({
      onChange: (field, text) => {
        this.controller.onChange(field, text);
      },
      onSubmit: (evt) => {
        this.controller.onSubmit(evt);
      },
    });
  }
}
