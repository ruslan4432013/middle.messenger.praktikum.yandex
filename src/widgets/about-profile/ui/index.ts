import { ChangeAvatar } from '@features/change-avatar';
import { ProfileField } from '@shared/ui/profile-field';
import { ChangeProfile } from '@features/change-profile';
import { ChangePassword } from '@features/change-password';
import { Logout } from '@features/logout';

import s from './about-profile.module.scss';
import render from './about-profile.hbs';

export const AboutProfile = () => {
  const fields = [
    ProfileField({
      label: 'Почта', value: 'pochta@yandex.ru', onlyRead: true, name: 'email',
    }),
    ProfileField({
      label: 'Логин', value: 'ivanivanov', onlyRead: true, name: 'login',
    }),
    ProfileField({
      label: 'Имя', value: 'Иван', onlyRead: true, name: 'first_name',
    }),
    ProfileField({
      label: 'Фамилия', value: 'Иванов', onlyRead: true, name: 'second_name',
    }),
    ProfileField({
      label: 'Имя в чате', value: 'Иван', onlyRead: true, name: 'display_name',
    }),
    ProfileField({
      label: 'Телефон', value: '+7 (909) 967 30 30', onlyRead: true, name: 'phone', fieldType: 'tel',
    }),
  ];
  const actions = [
    ChangeProfile(),
    ChangePassword(),
    Logout(),
  ];
  const components = {
    ChangeAvatar: ChangeAvatar(),
    fields,
    actions,
  };
  const source = { ...components, ...s };
  return render(source);
};
