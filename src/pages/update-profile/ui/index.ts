import { EditProfile } from '@widgets/edit-profile'

import render from './update-profile.hbs'
import { ProfileSidebar } from '@widgets/profile-sidebar'
import { ProfileField } from '@shared/ui/profile-field'

export const UpdateProfilePage = () => {
  const fields = [
    ProfileField({ label: 'Почта', value: 'pochta@yandex.ru' }),
    ProfileField({ label: 'Логин', value: 'ivanivanov' }),
    ProfileField({ label: 'Имя', value: 'Иван' }),
    ProfileField({ label: 'Фамилия', value: 'Иванов' }),
    ProfileField({ label: 'Имя в чате', value: 'Иван' }),
    ProfileField({ label: 'Телефон', value: '+7 (909) 967 30 30' }),
  ]
  const components = {
    EditProfile: EditProfile({ fields }),
    ProfileSidebar: ProfileSidebar(),
  }

  const source = { ...components }
  return render(source)
}
