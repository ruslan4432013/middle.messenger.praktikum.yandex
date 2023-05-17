import { Path } from '@shared/config';
import { BaseView, router } from '@shared/lib';
import { toast } from '@shared/ui/toast';

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
            .then((res) => {
              if (res.id) {
                toast.success('Вы успешно зарегистрировались');
                router.go(Path.LOGIN);
              }
            })
            .catch((reason) => {
              toast.error(reason);
            });
        }
      },
    });
  }
}
