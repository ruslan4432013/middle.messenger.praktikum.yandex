import { Component } from '@shared/lib/component';
import { ProfileField } from '@shared/ui/profile-field';
import { EditProfile } from '@widgets/edit-profile';
import { ProfileSidebar } from '@widgets/profile-sidebar';

import render from './update-profile.hbs';

const fields = [
  ProfileField({ label: 'Почта', value: 'pochta@yandex.ru', name: 'email' }),
  ProfileField({ label: 'Логин', value: 'ivanivanov', name: 'login' }),
  ProfileField({ label: 'Имя', value: 'Иван', name: 'first_name' }),
  ProfileField({ label: 'Фамилия', value: 'Иванов', name: 'second_name' }),
  ProfileField({ label: 'Имя в чате', value: 'Иван', name: 'display_name' }),
  ProfileField({
    label: 'Телефон', value: '+7 (909) 967 30 30', name: 'phone', fieldType: 'tel',
  }),
];
const components = {
  EditProfile: new EditProfile({ fields }),
  ProfileSidebar: ProfileSidebar(),
};

const source = { ...components, fields };

export class UpdateProfilePage extends Component {
  constructor(props: {}) {
    Object.assign(props, source);
    super('div', props);
  }

  protected render(): DocumentFragment {
    return this.compile(render, this.props);
  }
}
