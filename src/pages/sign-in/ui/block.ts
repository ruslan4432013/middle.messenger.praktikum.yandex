import { AuthForm } from '@features/auth-form';
import { Path } from '@shared/config';
import { Component, type PropType, validate } from '@shared/lib';
import { AuthField } from '@shared/ui/auth-field';
import { Button } from '@shared/ui/button';

import { type SignInData } from '../model';

type Props = {
  onChange: (field: keyof SignInData, value: string) => void
  onSubmit: (evt: Event) => void
} & PropType;

export class SignInPage extends Component<Props> {
  constructor(props: Props) {
    super('div', props);
  }

  private getFields() {
    const email = new AuthField({
      label: 'Почта',
      fieldType: 'email',
      id: 'email',
      name: 'email',
      validationFn: validate.email,
      errorMessage: 'Неверная почта',
      onChange: (text: string) => {
        this.props.onChange('email', text);
      },
    });
    const login = new AuthField({
      label: 'Логин',
      fieldType: 'text',
      id: 'login',
      name: 'login',
      validationFn: validate.login,
      errorMessage: 'Неверный логин',
      onChange: (text: string) => {
        this.props.onChange('login', text);
      },
    });
    const name = new AuthField({
      label: 'Имя',
      fieldType: 'text',
      id: 'first-name',
      name: 'first_name',
      validationFn: validate.name,
      errorMessage: 'Неверное имя',
      onChange: (text: string) => {
        this.props.onChange('first_name', text);
      },
    });
    const lastName = new AuthField({
      label: 'Фамилия',
      fieldType: 'text',
      id: 'last-name',
      name: 'second_name',
      validationFn: validate.name,
      errorMessage: 'Неверная фамилия',
      onChange: (text: string) => {
        this.props.onChange('last_name', text);
      },
    });
    const phone = new AuthField({
      label: 'Телефон',
      fieldType: 'tel',
      id: 'phone',
      name: 'phone',
      validationFn: validate.phone,
      errorMessage: 'Неверный номер телефона',
      onChange: (text: string) => {
        this.props.onChange('phone', text);
      },
    });
    const password1 = new AuthField({
      label: 'Пароль',
      fieldType: 'password',
      id: 'password1',
      name: 'password',
      validationFn: validate.password,
    });
    const password2 = new AuthField({
      label: 'Пароль (еще раз)',
      fieldType: 'password',
      id: 'password2',
      name: 'password',
      validationFn: validate.password,
      errorMessage: 'Неверный пароль',
      onChange: (text: string) => {
        this.props.onChange('password', text);
      },
    });

    password2.isValid = () => {
      const passwordEqual = password1.value === password2.value;
      if (!passwordEqual) {
        password2.setProps({ errorMessage: 'Пароли не совпадают' });
      } else {
        password2.setProps({ errorMessage: 'Неверный пароль' });
      }
      return validate.password(password1.value) && passwordEqual;
    };

    return [email, login, name, lastName, phone, password1, password2];
  }

  public render(): DocumentFragment {
    const fields = this.getFields();
    const authForm = new AuthForm({
      fields,
      titleText: 'Регистрация',
      linkProps: {
        text: 'Войти',
        to: Path.LOGIN,
      },
      minHeight: '540px',
      Button: new Button({
        text: 'Зарегистрироваться',
        type: 'submit',
        events: {
          click: (e) => {
            this.props.onSubmit(e);
            fields.forEach((field) => {
              field.validate();
            });
          },
        },
      }),
    });
    return authForm.render();
  }
}
