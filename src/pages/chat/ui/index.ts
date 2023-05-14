import { Path } from '@shared/config';
import { Component, router } from '@shared/lib';
import { ChatList } from '@widgets/chat-list';
import { ChatMessages } from '@widgets/chat-messages';
import { Footer } from '@widgets/footer';
import { Header } from '@widgets/header';

import render from './chat.hbs';
import s from './chat.module.scss';

@router.use(Path.CHAT)
export class ChatPage extends Component {
  constructor() {
    super('div');
  }

  protected getAdditionalProps() {
    const components = {
      ChatList: new ChatList(),
      Header: new Header(),
      Footer: new Footer(),
      ChatMessages: new ChatMessages(),
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
