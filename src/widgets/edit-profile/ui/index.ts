import { ChangeAvatar } from '@features/change-avatar'
import { ProfileField } from '@shared/ui/profile-field'
import { Button } from '@shared/ui/button'

import * as s from './edit-profile.module.scss'
import render from './edit-profile.hbs'


type Props = {
  fields: ReturnType<typeof ProfileField>[]
}
export const EditProfile = ({ fields }: Props) => {

  const components = {
    ChangeAvatar: ChangeAvatar(),
    fields,
    Button: Button({ text: 'Сохранить' })
  }
  const source = { ...components, ...s }
  return render(source)
}
