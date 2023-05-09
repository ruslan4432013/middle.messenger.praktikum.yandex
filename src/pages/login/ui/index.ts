import { BaseView } from '@shared/lib';

import { LoginPage } from './block';

import { LoginController } from '../model';
import { type LoginData } from '../model';

export class LoginPageView extends BaseView<LoginData> {
  public readonly controller = new LoginController();

  public getComponent() {
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
