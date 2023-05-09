import { ChangeAvatar } from '@features/change-avatar';
import { ChangePassword } from '@features/change-password';
import { ChangeProfile } from '@features/change-profile';
import { Logout } from '@features/logout';
import { Component } from '@shared/lib';
import { ProfileField } from '@shared/ui/profile-field';

import render from './about-profile.hbs';
import s from './about-profile.module.scss';

export class AboutProfile extends Component {
  constructor() {
    super('div');
  }

  protected getAdditionalProps() {
    const fields = [
      new ProfileField({
        label: 'Почта',
        value: 'pochta@yandex.ru',
        onlyRead: true,
        name: 'email',
        fieldType: 'email',
      }),
      new ProfileField({
        label: 'Логин',
        value: 'ivanivanov',
        onlyRead: true,
        name: 'login',
        fieldType: 'text',
      }),
      new ProfileField({
        label: 'Имя',
        value: 'Иван',
        onlyRead: true,
        name: 'first_name',
        fieldType: 'text',
      }),
      new ProfileField({
        label: 'Фамилия',
        value: 'Иванов',
        onlyRead: true,
        name: 'second_name',
        fieldType: 'text',
      }),
      new ProfileField({
        label: 'Имя в чате',
        value: 'Иван',
        onlyRead: true,
        name: 'display_name',
        fieldType: 'text',
      }),
      new ProfileField({
        label: 'Телефон',
        value: '+7 (909) 967 30 30',
        onlyRead: true,
        name: 'phone',
        fieldType: 'tel',
      }),
    ];
    const actions = [
      new ChangeProfile(),
      new ChangePassword(),
      new Logout(),
    ];
    const components = {
      ChangeAvatar: new ChangeAvatar(),
      fields,
      actions,
    };
    return { ...components, ...s };
  }

  public render() {
    return this.compile(render, this.props);
  }
}
