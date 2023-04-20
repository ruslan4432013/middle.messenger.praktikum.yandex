import { type AuthField } from '@shared/ui/auth-field';

import render from './auth-form.hbs';
import s from './auth-form.module.scss';

type Props = {
  fields: ReturnType<typeof AuthField>[];
  title: string;
  Button: string;
  linkText: string;
  minHeight?: string;
};

export const AuthForm = (props: Props) => {
  const { title: titleText, ...other } = props;
  const source = { ...other, ...s, titleText };
  return render(source);
};
