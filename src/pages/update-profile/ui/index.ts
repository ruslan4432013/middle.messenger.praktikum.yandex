import {
  sessionLib, sessionApi, type User,
} from '@entities/session';
import { Path } from '@shared/config';
import {
  Component, store, validate, _, router,
} from '@shared/lib';
import { connect } from '@shared/lib/store/connect';
import { ProfileField } from '@shared/ui/profile-field';
import { EditProfile } from '@widgets/edit-profile';
import { ProfileSidebar } from '@widgets/profile-sidebar';

import render from './update-profile.hbs';

type Props = {
  user?: User,
  fields: ProfileField[]
  EditProfile: EditProfile,
} & PropType;

@router.use(Path.USER_SETTINGS)
@connect((state) => ({ user: state.user }))
export class UpdateProfilePage extends Component<Props> {
  private _fields: ProfileField[];

  private _editProfile: EditProfile;

  constructor() {
    const fields = [
      new ProfileField({
        label: 'Почта',
        value: '',
        name: 'email',
        validationFn: validate.email,
        errorMessage: 'Неверная почта',
        fieldType: 'email',
      }),
      new ProfileField({
        label: 'Логин',
        value: '',
        name: 'login',
        validationFn: validate.login,
        errorMessage: 'Неверный логин',
        fieldType: 'text',
      }),
      new ProfileField({
        label: 'Имя',
        value: '',
        name: 'first_name',
        validationFn: validate.name,
        errorMessage: 'Неверное имя',
        fieldType: 'text',
      }),
      new ProfileField({
        label: 'Фамилия',
        value: '',
        name: 'second_name',
        validationFn: validate.name,
        errorMessage: 'Неверная фамилия',
        fieldType: 'text',
      }),
      new ProfileField({
        label: 'Имя в чате',
        value: '',
        name: 'display_name',
        validationFn: validate.login,
        errorMessage: 'Неверное имя в чате',
        fieldType: 'text',
      }),
      new ProfileField({
        label: 'Телефон',
        value: '',
        name: 'phone',
        fieldType: 'tel',
        validationFn: validate.phone,
        errorMessage: 'Неверный номер телефона',
      }),
    ];
    const editProfile = new EditProfile({ fields });
    const components = {
      EditProfile: editProfile,
      ProfileSidebar: new ProfileSidebar(),
    };

    super('div', { ...components, fields });
    this._fields = fields;
    this._editProfile = editProfile;
  }

  protected componentDidMount() {
    sessionApi.getMe().then((user) => {
      store.set('user', user);
      this.setUserData(user);
    });
  }

  protected componentDidUpdate(oldProps: Props, newProps: Props): boolean {
    const { user } = newProps;
    if (user) {
      this.setUserData(user);
    }
    return super.componentDidUpdate(oldProps, newProps);
  }

  private setUserData(user: User) {
    this.setProps({ userName: user.firstName });
    _.updateProfileFields(this._fields, (name) => {
      const filedName = sessionLib.userMapper[name];
      const value = user[filedName];
      if (!value) return '';
      return value.toString();
    });
    this._editProfile.setProps({ userName: user.firstName });
  }

  public render(): DocumentFragment {
    return this.compile(render, this.props);
  }
}
