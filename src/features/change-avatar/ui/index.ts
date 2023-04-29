import { Component } from '@shared/lib';

import render from './change-avatar.hbs';
import s from './change-avatar.module.scss';

export class ChangeAvatar extends Component {
  constructor() {
    super('div');
  }

  public render() {
    const context = {
      src: 'https://via.placeholder.com/130x130',
      name: 'avatar',
      id: 'file-name',
    };
    const source = { ...s, ...context };
    return this.compile(render, source);
  }
}
