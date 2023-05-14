import { userApi } from '@entities/user';
import { API_URL } from '@shared/config';
import { Component, _ } from '@shared/lib';
import { connect } from '@shared/lib/store/connect';

import render from './change-avatar.hbs';
import s from './change-avatar.module.scss';

type Props = {
  avatar?: string
} & PropType;

@connect((state) => ({ avatar: state?.user?.avatar }))
export class ChangeAvatar extends Component<Props> {
  constructor(props: Props) {
    const source: Props = {
      ...props,
      events: {
        change: (evt) => {
          const fileTarget = (evt.target as HTMLInputElement).files![0];
          // Задаем параметры обрезки
          const width = 140;
          const height = 140;
          _.cropImage(fileTarget, width, height, ({ src, file }) => {
            this.setProps({ avatar: src });
            const avatar = file;
            userApi.updateAvatar({ avatar });
          });
        },
      },
    };
    super('div', source);
  }

  public render() {
    let avatar = this.props.avatar ? this.props.avatar : 'https://via.placeholder.com/130x130';
    avatar = avatar.startsWith('data:image') || avatar.startsWith('http') ? avatar : `${API_URL}/resources${avatar}`;
    const context = {
      src: avatar,
      name: 'avatar',
      id: 'file-name',
    };
    const source = { ...s, ...context, ...this.props };
    return this.compile(render, source);
  }
}
