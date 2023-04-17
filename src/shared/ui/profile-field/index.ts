import render from './profile-field.hbs';
import s from './profile-field.module.scss';

type Props = {
  label: string;
  value: string;
  name: string;
  onlyRead?: boolean;
  fieldType?: 'text' | 'password' | 'tel';
};

export const ProfileField = (props: Props) => {
  const context = { ...props, ...s };
  return render(context);
};
