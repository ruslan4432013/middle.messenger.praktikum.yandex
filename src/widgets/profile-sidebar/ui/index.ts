import { Path } from '@shared/config';
import { Component, RouterDOM } from '@shared/lib';

import arrowLeftIcon from './arrow-left.svg';
import render from './profile-sidebar.hbs';
import s from './profile-sidebar.module.scss';

export class ProfileSidebar extends Component {
  constructor() {
    super('div');
  }

  protected getAdditionalProps() {
    const context = {
      arrowLeftIcon,
    };
    return {
      ...s,
      ...context,
      events: {
        click: () => {
          new RouterDOM.Router().go(Path.HOME);
        },
      },
    };
  }

  public render(): DocumentFragment {
    return this.compile(render, this.props);
  }
}
