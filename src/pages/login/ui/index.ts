import { LoginController } from '@pages/login/model';
import { BaseView } from '@shared/lib';

import { LoginPage } from './block';

import { type LoginData } from '../model/types';

export class LoginPageView extends BaseView<LoginData> {
  public readonly controller = new LoginController();

  constructor(public root: Element) {
    super();
  }

  protected getComponent() {
    return new LoginPage({
      onSubmit: (evt: Event) => {
        evt.preventDefault();
        this.controller.submit();
      },
      onChange: (field, text) => {
        this.controller.changeField(field, text);
      },
    });
  }
}
