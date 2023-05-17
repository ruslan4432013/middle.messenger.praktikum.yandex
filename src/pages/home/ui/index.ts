import { sessionApi } from '@entities/session';
import { Path } from '@shared/config';
import { Component, router } from '@shared/lib';
import { ChatList } from '@widgets/chat-list';

import render from './home.hbs';
import s from './home.module.scss';

@router.use(Path.HOME)
@sessionApi.requiredAuth
export class HomePage extends Component {
  constructor() {
    super('div');
  }

  protected getAdditionalProps() {
    const components = {
      ChatList: new ChatList(),
    };

    return {
      ...components,
      ...s,
    };
  }

  public render() {
    return this.compile(render, this.props);
  }
}
