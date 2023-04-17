import { AuthField } from '@shared/ui/auth-field';
import { AuthForm } from '@features/auth-form';
import { Button } from '@shared/ui/button';

export const LoginPage = () => {
  const fields = [
    AuthField({
      label: 'Логин', fieldType: 'text', id: 'login', name: 'login',
    }),
    AuthField({
      label: 'Пароль', fieldType: 'password', id: 'password', name: 'password',
    }),
  ];

  const context = {
    title: 'Вход',
    linkText: 'Войти',
    minHeight: '320px',
  };

  const components = {
    Button: Button({ text: 'Авторизоваться' }),
  };

  const source = { fields, ...context, ...components };

  return AuthForm(source);
};
