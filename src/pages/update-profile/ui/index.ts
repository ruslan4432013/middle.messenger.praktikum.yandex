import { Component, validate } from '@shared/lib';
import { ProfileField } from '@shared/ui/profile-field';
import { EditProfile } from '@widgets/edit-profile';
import { ProfileSidebar } from '@widgets/profile-sidebar';

import render from './update-profile.hbs';

const fields = [
  new ProfileField({
    label: 'Почта',
    value: 'pochta@yandex.ru',
    name: 'email',
    validationFn: validate.email,
    errorMessage: 'Неверная почта',
    fieldType: 'email',
  }),
  new ProfileField({
    label: 'Логин',
    value: 'ivanivanov',
    name: 'login',
    validationFn: validate.login,
    errorMessage: 'Неверный логин',
    fieldType: 'text',
  }),
  new ProfileField({
    label: 'Имя',
    value: 'Иван',
    name: 'first_name',
    validationFn: validate.name,
    errorMessage: 'Неверное имя',
    fieldType: 'text',
  }),
  new ProfileField({
    label: 'Фамилия',
    value: 'Иванов',
    name: 'second_name',
    validationFn: validate.name,
    errorMessage: 'Неверная фамилия',
    fieldType: 'text',
  }),
  new ProfileField({
    label: 'Имя в чате',
    value: 'Иван',
    name: 'display_name',
    validationFn: validate.login,
    errorMessage: 'Неверное имя в чате',
    fieldType: 'text',
  }),
  new ProfileField({
    label: 'Телефон',
    value: '+7 (909) 967 30 30',
    name: 'phone',
    fieldType: 'tel',
    validationFn: validate.phone,
    errorMessage: 'Неверный номер телефона',
  }),
];
const components = {
  EditProfile: new EditProfile({ fields }),
  ProfileSidebar: new ProfileSidebar(),
};

const source = {
  ...components,
  fields,
};

export class UpdateProfilePage extends Component {
  constructor() {
    const props = {};
    Object.assign(props, source);
    super('div', props);
  }

  public render(): DocumentFragment {
    return this.compile(render, this.props);
  }
}
