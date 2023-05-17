import { chatApi } from '@entities/chat';
import { type UserDto } from '@entities/session';
import { userApi } from '@entities/user';
import {
  Component, _, useParams,
} from '@shared/lib';
import { AuthField } from '@shared/ui/auth-field';
import { Modal } from '@shared/ui/modal';
import { ModalContent } from '@shared/ui/modal-content';
import { toast } from '@shared/ui/toast';

import render from './add-user-to-chat.hbs';
import plusIcon from './plus_icon.svg';
import s from './styles.module.scss';
import { UserList } from './user-list/user-list';

enum UserChatEvents {
  USER_CHANGED = 'flow:user-changed',
  RESET_USER = 'flow:reset-user',
}

export class AddUserToChat extends Component {
  private _modal: Modal;

  private _selectedUser: UserDto | null = null;

  constructor() {
    super('button');
    const self = this;
    const children = new UserList({
      usersDto: [],
      onChange(user) {
        self.eventBus().emit(UserChatEvents.USER_CHANGED, user);
      },
    });
    const update = _.debounce<string>((login) => {
      userApi.getUsersByLogin({ login })
        .then((res) => {
          children.setProps({ usersDto: res });
        });
    }, 500);
    const userNameField = new AuthField({
      fieldType: 'text',
      label: 'Начните вводить имя пользователя',
      id: 'chat-name',
      name: 'title',
      validationFn(value) {
        if (!(value.length > 3)) {
          userNameField.setProps({ errorMessage: 'Логин пользователя не меньше 3 символов' });
          return false;
        }
        if (!self._selectedUser) {
          userNameField.setProps({ errorMessage: 'Выберите пользователя' });
          return false;
        }
        return true;
      },
      errorMessage: 'Логин пользователя не меньше 3 символов',
      onChange(value) {
        if (self._selectedUser) {
          self._selectedUser = null;
        }
        update(value);
      },

    });
    const modal = new Modal({
      Content: new ModalContent({
        title: 'Добавить пользователя',
        buttonText: 'Добавить',
        fields: [userNameField],
        children,
        onClick: () => {
          userNameField.validate();
          if (userNameField.isValid() && self._selectedUser) {
            const { chatId } = useParams<{ chatId: string }>();
            chatApi.addUserToChat({
              userId: self._selectedUser.id.toString(),
              chatId,
            }).then((res) => {
              if (res.ok) {
                toast.success(`${self._selectedUser!.login} был добавлен в чат`);
              } else {
                toast.error('Упс... что-то пошло не так');
              }
            });
          }
        },
      }),
    });
    self.eventBus().on(UserChatEvents.USER_CHANGED, (user: UserDto) => {
      console.log('emitted');
      self._selectedUser = user;
      userNameField.setValue(user.login);
    });
    self.eventBus().on(UserChatEvents.RESET_USER, () => {
      self._selectedUser = null;
    });
    this._modal = modal;
  }

  protected getAdditionalProps(): PropType {
    return {
      plusIcon,
      attr: {
        class: s.button,
      },
      events: {
        click: () => {
          this._modal.show();
        },
      },
    };
  }

  public render(): DocumentFragment {
    return this.compile(render, this.props);
  }
}
