import render from './profile-field.hbs'
import s from './profile-field.module.scss'

type Props = {
  label: string;
  value: string;
  onlyRead?: boolean;
  fieldType?: 'text' | 'password'
}

export const ProfileField = (props: Props) => {
  const context = {...props, ...s}
  return render(context)
}
