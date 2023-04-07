import { AuthField } from '@shared/ui/auth-field'
import { AuthForm } from '@features/auth-form'
import { Button } from '@shared/ui/button'


export const SignInPage = () => {
  const fields = [
    AuthField({ label: 'Почта', fieldType: 'email', id: 'email' }),
    AuthField({ label: 'Логин', fieldType: 'text', id: 'login' }),
    AuthField({ label: 'Имя', fieldType: 'text', id: 'first-name' }),
    AuthField({ label: 'Фамилия', fieldType: 'text', id: 'last-name' }),
    AuthField({ label: 'Телефон', fieldType: 'tel', id: 'phone' }),
    AuthField({ label: 'Пароль', fieldType: 'password', id: 'password1' }),
    AuthField({ label: 'Пароль (еще раз)', fieldType: 'password', id: 'password2' }),
  ]
  const context = {
    title: 'Регистрация',
    linkText: 'Войти',
    minHeight: '540px',
  }

  const components = {
    Button: Button({ text: 'Зарегистрироваться' })
  }
  const source = { fields, ...context, ...components }

  return AuthForm(source)
}
