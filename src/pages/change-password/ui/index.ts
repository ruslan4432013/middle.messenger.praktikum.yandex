import { sessionApi } from '@entities/session';
import { userApi } from '@entities/user';
import { Path } from '@shared/config';
import { Component, router, validate } from '@shared/lib';
import { ProfileField } from '@shared/ui/profile-field';
import { toast } from '@shared/ui/toast';
import { EditProfile } from '@widgets/edit-profile';
import { ProfileSidebar } from '@widgets/profile-sidebar';

import render from './change-password.hbs';

@router.use(Path.CHANGE_PASSWORD)
@sessionApi.requiredAuth
export class ChangePasswordPage extends Component {
  constructor() {
    super('div');
  }

  protected getAdditionalProps() {
    const newPassword = new ProfileField({
      label: 'Новый пароль',
      value: 'password',
      fieldType: 'password',
      name: 'newPassword',
      validationFn: validate.password,
      errorMessage: 'Неверный пароль',
    });
    const confirmPassword = new ProfileField({
      label: 'Повторите новый пароль',
      value: 'password',
      fieldType: 'password',
      name: 'newPassword',
      validationFn: (value) => {
        if (!validate.password(value)) {
          confirmPassword.setProps({ errorMessage: 'Неверный пароль' });
          return false;
        }
        if (confirmPassword.value !== newPassword.value) {
          confirmPassword.setProps({ errorMessage: 'Пароли не совпадают' });
          return false;
        }
        return true;
      },
      errorMessage: 'Неверный пароль',
    });
    const oldPassword = new ProfileField({
      label: 'Старый пароль',
      value: 'password',
      fieldType: 'password',
      name: 'oldPassword',
      validationFn: validate.password,
      errorMessage: 'Неверный пароль',
    });
    const fields = [
      oldPassword,
      newPassword,
      confirmPassword,
    ];
    const components = {
      EditProfile: new EditProfile({
        fields,
        onSubmit() {
          fields.forEach((f) => f.validate());
          if (fields.every((f) => f.isValid())) {
            userApi.changePassword(({
              oldPassword: oldPassword.value,
              newPassword: newPassword.value,
            })).then((res) => {
              if (!res.ok) {
                toast.error(res.json().reason);
              } else {
                toast.success('Password was changed');
              }
            });
          }
        },
      }),
      ProfileSidebar: new ProfileSidebar(),
    };
    return {
      fields,
      ...components,
    };
  }

  public render() {
    return this.compile(render, this.props);
  }
}
