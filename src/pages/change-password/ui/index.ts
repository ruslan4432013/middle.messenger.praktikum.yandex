import { EditProfile } from '@widgets/edit-profile';

import { ProfileSidebar } from '@widgets/profile-sidebar';
import { ProfileField } from '@shared/ui/profile-field';
import render from './change-password.hbs';

export const ChangePasswordPage = () => {
  const fields = [
    ProfileField({
      label: 'Старый пароль', value: 'password', fieldType: 'password', name: 'oldPassword',
    }),
    ProfileField({
      label: 'Новый пароль', value: 'password', fieldType: 'password', name: 'newPassword',
    }),
    ProfileField({
      label: 'Повторите новый пароль', value: 'password', fieldType: 'password', name: 'newPassword',
    }),
  ];
  const components = {
    EditProfile: EditProfile({ fields }),
    ProfileSidebar: ProfileSidebar(),
  };

  const source = { ...components };
  return render(source);
};
