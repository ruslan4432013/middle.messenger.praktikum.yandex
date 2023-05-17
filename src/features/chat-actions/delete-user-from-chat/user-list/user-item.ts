import { type UserChatDto } from '@entities/chat';
import { API_URL } from '@shared/config';
import { Component } from '@shared/lib';

import s from './styles.module.scss';
import render from './user-item.hbs';

import deleteIcon from '../minus_icon.svg';

type UserItemProps = {
  user: UserChatDto,
  onClick?: (user: UserChatDto) => void
  onDelete?: (user: UserChatDto) => void
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
    const { onClick, onDelete } = props;
    return {
      ...s,
      avatar: avatarSrc,
      login,
      email,
      isNotAdmin: props.user.role !== 'admin',
      deleteIcon,
      events: {
        click: (evt) => {
          if (evt.target
            && 'dataset' in evt.target
            && evt.target.dataset !== null
            && typeof evt.target.dataset === 'object'
            && 'action' in evt.target.dataset
            && evt.target.dataset.action === 'delete') {
            onDelete?.(props.user);
          }
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
