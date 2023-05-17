import {
  sessionApi, sessionLib,
} from '@entities/session';
import { ChangeAvatar } from '@features/change-avatar';
import { ChangePassword } from '@features/change-password';
import { ChangeProfile } from '@features/change-profile';
import { Logout } from '@features/logout';
import { type User } from '@shared/api';
import { _, Component, store } from '@shared/lib';
import { connect } from '@shared/lib/store/connect';
import { ProfileField } from '@shared/ui/profile-field';

import render from './about-profile.hbs';
import s from './about-profile.module.scss';

type AboutProfileProps = {
  user?: User,
  fields: ProfileField[],
  userName?: string
} & PropType;

@connect((state) => ({ user: state.user }))
export class AboutProfile extends Component<AboutProfileProps> {
  private _fields: ProfileField[];

  constructor() {
    const fields = [
      new ProfileField({
        label: 'Почта',
        value: '',
        onlyRead: true,
        name: 'email',
        fieldType: 'email',
      }),
      new ProfileField({
        label: 'Логин',
        value: '',
        onlyRead: true,
        name: 'login',
        fieldType: 'text',
      }),
      new ProfileField({
        label: 'Имя',
        value: '',
        onlyRead: true,
        name: 'first_name',
        fieldType: 'text',
      }),
      new ProfileField({
        label: 'Фамилия',
        value: '',
        onlyRead: true,
        name: 'second_name',
        fieldType: 'text',
      }),
      new ProfileField({
        label: 'Имя в чате',
        value: '',
        onlyRead: true,
        name: 'display_name',
        fieldType: 'text',
      }),
      new ProfileField({
        label: 'Телефон',
        value: '',
        onlyRead: true,
        name: 'phone',
        fieldType: 'tel',
      }),
    ];
    super('div', { fields });
    this._fields = fields;
  }

  public componentDidMount() {
    sessionApi.getMe()
      .then((user) => {
        store.set('user', user);
        this.setUserData(user);
      });
  }

  protected componentDidUpdate(_oldProps: AboutProfileProps, newProps: AboutProfileProps): boolean {
    const { user } = newProps;
    if (user) {
      this.setUserData(user);
    }
    return true;
  }

  private setUserData(user: User) {
    this.setProps({ userName: user.firstName });
    _.updateProfileFields(this._fields, (name) => {
      const filedName = sessionLib.userMapper[name];
      const value = user[filedName];
      if (!value) return '';
      return value.toString();
    });
  }

  protected getAdditionalProps() {
    const actions = [
      new ChangeProfile(),
      new ChangePassword(),
      new Logout(),
    ];
    const components = {
      ChangeAvatar: new ChangeAvatar(),
      actions,
    };
    return { ...components, ...s };
  }

  public render() {
    return this.compile(render, this.props);
  }
}
