import { AuthForm } from '@features/auth-form';
import { type PropType, validate } from '@shared/lib';
import { Component } from '@shared/lib/component';
import { AuthField } from '@shared/ui/auth-field';
import { Button } from '@shared/ui/button';

type Props = {
  onSubmit: (evt: Event) => void
  onChange: (field: 'login' | 'password', value: string) => void
} & PropType;

export class LoginPage extends Component<Props> {
  constructor(props: Props) {
    super('div', props);
  }

  protected getAdditionalProps(): Partial<Props> {
    return {
      events: {
        submit: (evt) => {
          this.props.onSubmit(evt);
        },
      },
    };
  }

  public render(): DocumentFragment {
    const loginField = new AuthField({
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
    const passwordField = new AuthField({
      label: 'Пароль',
      fieldType: 'password',
      id: 'password',
      name: 'password',
      validationFn: validate.password,
      errorMessage: 'Неверный пароль',
      onChange: (text: string) => {
        this.props.onChange('password', text);
      },
    });
    const self = this;
    const fields = [loginField, passwordField];
    const authFrom = new AuthForm({
      fields,
      Button: new Button({
        text: 'Авторизоваться',
        events: {
          click: (evt) => {
            self.props.onSubmit(evt);
            fields.forEach((el) => el.validate());
          },
        },
        attr: {
          type: 'submit',
        },
      }),
      titleText: 'Вход',
      linkText: 'Войти',
      minHeight: '320px',
    });
    return authFrom.render();
  }
}
