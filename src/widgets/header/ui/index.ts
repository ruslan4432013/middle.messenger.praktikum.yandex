import { Component } from '@shared/lib';

import render from './header.hbs';
import s from './header.module.scss';
import menuIcon from './menu-icon.svg';

export class Header extends Component {
  constructor() {
    super('header');
  }

  protected getAdditionalProps(): Partial<PropType> {
    const context = {
      userIcon: 'https://via.placeholder.com/34x34',
      userName: 'Вадим',
      menuIcon,
    };
    return { ...s, ...context, attr: { class: s.header } };
  }

  public render() {
    return this.compile(render, this.props);
  }
}
