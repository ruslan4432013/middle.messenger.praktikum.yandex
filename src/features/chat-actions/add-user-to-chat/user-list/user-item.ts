import { type UserDto } from '@entities/session';
import { API_URL } from '@shared/config';
import { Component } from '@shared/lib';

import s from './styles.module.scss';
import render from './user-item.hbs';

type UserItemProps = {
  user: UserDto,
  onClick?: (userId: UserDto) => void
} & PropType;

export class UserItem extends Component<UserItemProps> {
  constructor(props: UserItemProps) {
    super('div', props);
  }

  protected getAdditionalProps(props:UserItemProps): PropType {
    const {
      avatar, login, email,
    } = props.user;
    const avatarSrc = avatar ? `${API_URL}/resources${avatar}` : 'https://via.placeholder.com/130x130';
    const { onClick } = props;
    return {
      ...s,
      avatar: avatarSrc,
      login,
      email,
      events: {
        click: () => {
          onClick?.(props.user);
        },
      },
      attr: {
        class: s.user_item,
      },
    };
  }

  public render(): DocumentFragment {
    return this.compile(render, this.props);
  }
}
