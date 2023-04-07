import { EditProfile } from '@widgets/edit-profile'

import render from './change-password.hbs'
import { ProfileSidebar } from '@widgets/profile-sidebar'
import { ProfileField } from '@shared/ui/profile-field'

export const ChangePasswordPage = () => {
  const fields = [
    ProfileField({ label: 'Старый пароль', value: 'password', fieldType: 'password' }),
    ProfileField({ label: 'Новый пароль', value: 'password', fieldType: 'password' }),
    ProfileField({ label: 'Повторите новый пароль', value: 'password', fieldType: 'password' }),
  ]
  const components = {
    EditProfile: EditProfile({ fields }),
    ProfileSidebar: ProfileSidebar(),
  }

  const source = { ...components }
  return render(source)
}
