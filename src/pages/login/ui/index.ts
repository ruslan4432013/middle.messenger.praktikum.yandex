import { Path } from '@shared/config';
import { BaseView, router } from '@shared/lib';

import { LoginPage } from './block';

import { LoginController, type LoginData } from '../model';

@router.use(Path.LOGIN)
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
