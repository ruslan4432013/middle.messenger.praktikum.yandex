import { ProfileField } from '@shared/ui/profile-field';
import { EditProfile } from '@widgets/edit-profile';
import { ProfileSidebar } from '@widgets/profile-sidebar';

import render from './update-profile.hbs';

export const UpdateProfilePage = () => {
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
    EditProfile: EditProfile({ fields }),
    ProfileSidebar: ProfileSidebar(),
  };

  const source = { ...components };
  return render(source);
};
