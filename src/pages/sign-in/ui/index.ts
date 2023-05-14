import { sessionApi } from '@entities/session';
import { Path } from '@shared/config';
import { BaseView, router } from '@shared/lib';

import { SignInPage } from './block';

import { SignInController } from '../model';

@router.use(Path.REGISTER)
export class SignInPageView extends BaseView {
  public readonly controller = new SignInController();

  public getComponent() {
    return new SignInPage({
      onChange: (field, text) => {
        this.controller.onChange(field, text);
      },
      onSubmit: (evt, isValid: boolean) => {
        evt.preventDefault();
        if (isValid) {
          this.controller.onSubmit()
            .then(() => sessionApi.getMe())
            .then((data) => console.warn(data))
            .catch((reason) => {
              console.warn(reason);
              return sessionApi.getMe();
            })
            .then((data) => console.warn(data));
        }
      },
    });
  }
}
