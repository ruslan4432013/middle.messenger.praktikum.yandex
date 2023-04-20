import { AuthForm } from '@features/auth-form';
import { AuthField } from '@shared/ui/auth-field';
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
    Button: new Button({ text: 'Авторизоваться' }).getContent().outerHTML,
  };

  const source = { fields, ...context, ...components };

  return AuthForm(source);
};
