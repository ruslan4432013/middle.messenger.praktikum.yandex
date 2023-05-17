import { type UserDto } from '@entities/session';
import { Component, _ } from '@shared/lib';

import s from './styles.module.scss';
import { UserItem } from './user-item';
import render from './user-list.hbs';

type UserListProps = {
  usersDto: UserDto[],
  onChange?: (user: UserDto) => void
  users?: UserItem[],
} & PropType;

export class UserList extends Component<UserListProps> {
  constructor(props: UserListProps) {
    super('div', props);
  }

  protected getAdditionalProps(props: UserListProps): PropType {
    const { onChange } = props;
    const users = props.usersDto.map((user) => new UserItem({
      onClick: onChange,
      user,
    }));
    return {
      users,
      attr: {
        class: s.user_list,
      },
    };
  }

  protected componentDidUpdate(oldProps: UserListProps, newProps: UserListProps): boolean {
    if (!oldProps.usersDto && _.isArrayOrObject(newProps.usersDto)) {
      this._setUsers(newProps);
      return true;
    }
    if (_.isArrayOrObject(oldProps.usersDto)
      && _.isArrayOrObject(newProps.usersDto)
      && !_.isEqual(oldProps.usersDto, newProps.usersDto)) {
      this._setUsers(newProps);
      return true;
    }
    return false;
  }

  private _setUsers(props: UserListProps) {
    const {
      usersDto,
      onChange,
    } = props;
    const users = usersDto.map((user) => new UserItem({
      onClick: onChange,
      user,
    }));
    this.setProps({ users });
  }

  public render(): DocumentFragment {
    return this.compile(render, this.props);
  }
}
