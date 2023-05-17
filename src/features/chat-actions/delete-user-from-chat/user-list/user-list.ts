import { type UserChatDto, chatApi } from '@entities/chat';
import { Component, useParams } from '@shared/lib';
import { toast } from '@shared/ui/toast';

import s from './styles.module.scss';
import { UserItem } from './user-item';
import render from './user-list.hbs';

type UserListProps = {
  usersDto?: UserChatDto[],
  admin?: UserItem,
  users?: UserItem[],
} & PropType;

export class UserList extends Component<UserListProps> {
  constructor(props?: UserListProps) {
    super('div', props);
  }

  protected getAdditionalProps(): PropType {
    return {
      ...s,
      attr: {
        class: s.modal_content,
      },
    };
  }

  public setUsers(usersDto: UserChatDto[]) {
    const adminDto = usersDto.find((user) => user.role === 'admin');
    const admin = adminDto ? new UserItem({ user: adminDto }) : undefined;
    const self = this;
    const users = usersDto
      .filter((user) => (user.role !== 'admin'))
      .map((el) => new UserItem({
        user: el,
        onDelete(user) {
          const { chatId } = useParams<{ chatId: string }>();
          chatApi.deleteUserFromChat({ chatId, userId: user.id.toString() }).then((res) => {
            if (res.ok) {
              toast.success(`Пользователь ${user.login} был удален из чата`);
              return chatApi.getUsersByChat({ chatId });
            }
            throw new Error(res.json().reason);
          })
            .then((usersFetched) => self.setUsers(usersFetched))
            .catch((reason) => {
              toast.error('Упс, что-то пошло не так');
              console.error(reason);
            });
        },
      }));
    this.setProps({ users, admin });
  }

  public render(): DocumentFragment {
    return this.compile(render, this.props);
  }
}
