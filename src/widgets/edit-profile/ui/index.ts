import { ChangeAvatar } from '@features/change-avatar';
import { Button } from '@shared/ui/button';
import { type ProfileField } from '@shared/ui/profile-field';

import render from './edit-profile.hbs';
import s from './edit-profile.module.scss';

type Props = {
  fields: ReturnType<typeof ProfileField>[]
};
export const EditProfile = ({ fields }: Props) => {
  const components = {
    ChangeAvatar: ChangeAvatar(),
    fields,
    Button: Button({ text: 'Сохранить' }),
  };
  const source = { ...components, ...s };
  return render(source);
};
