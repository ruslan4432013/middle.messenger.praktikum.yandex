import render from './auth-field.hbs';
import s from './auth-field.module.scss';

type Props = {
  fieldType: 'password' | 'text' | 'email' | 'tel';
  name: string;
  label: string;
  id: string;
};

export const AuthField = (props: Props) => {
  const context = { ...props, ...s };
  return render(context);
};
