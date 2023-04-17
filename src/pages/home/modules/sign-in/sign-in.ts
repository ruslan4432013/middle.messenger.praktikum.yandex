import { AuthField } from '@shared/ui/auth-field';
import { AuthForm } from '@features/auth-form';
import { Button } from '@shared/ui/button';

export const SignInPage = () => {
  const fields = [
    AuthField({
      label: 'Почта', fieldType: 'email', id: 'email', name: 'email',
    }),
    AuthField({
      label: 'Логин', fieldType: 'text', id: 'login', name: 'login',
    }),
    AuthField({
      label: 'Имя', fieldType: 'text', id: 'first-name', name: 'first_name',
    }),
    AuthField({
      label: 'Фамилия', fieldType: 'text', id: 'last-name', name: 'second_name',
    }),
    AuthField({
      label: 'Телефон', fieldType: 'tel', id: 'phone', name: 'phone',
    }),
    AuthField({
      label: 'Пароль', fieldType: 'password', id: 'password1', name: 'password',
    }),
    AuthField({
      label: 'Пароль (еще раз)', fieldType: 'password', id: 'password2', name: 'password',
    }),
  ];
  const context = {
    title: 'Регистрация',
    linkText: 'Войти',
    minHeight: '540px',
  };

  const components = {
    Button: Button({ text: 'Зарегистрироваться' }),
  };
  const source = { fields, ...context, ...components };

  return AuthForm(source);
};
