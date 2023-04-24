import { Component, validate } from '@shared/lib';
import { ProfileField } from '@shared/ui/profile-field';
import { EditProfile } from '@widgets/edit-profile';
import { ProfileSidebar } from '@widgets/profile-sidebar';

import render from './change-password.hbs';

export class ChangePasswordPage extends Component {
  constructor() {
    super('div');
  }

  protected getAdditionalProps() {
    const fields = [
      new ProfileField({
        label: 'Старый пароль',
        value: 'password',
        fieldType: 'password',
        name: 'oldPassword',
        validationFn: validate.password,
        errorMessage: 'Неверный пароль',
      }),
      new ProfileField({
        label: 'Новый пароль',
        value: 'password',
        fieldType: 'password',
        name: 'newPassword',
        validationFn: validate.password,
        errorMessage: 'Неверный пароль',
      }),
      new ProfileField({
        label: 'Повторите новый пароль',
        value: 'password',
        fieldType: 'password',
        name: 'newPassword',
        validationFn: validate.password,
        errorMessage: 'Неверный пароль',
      }),
    ];
    const components = {
      EditProfile: new EditProfile({ fields }),
      ProfileSidebar: ProfileSidebar(),
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
