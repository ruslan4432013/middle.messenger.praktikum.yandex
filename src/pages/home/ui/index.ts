import { Component, type PropType } from '@shared/lib';
import { ChatList } from '@widgets/chat-list';
import { ChatMessages } from '@widgets/chat-messages';
import { Footer } from '@widgets/footer';
import { Header } from '@widgets/header';

import render from './home.hbs';
import s from './home.module.scss';

type Props = {
  chatUuid: null | string
} & PropType;

export class HomePage extends Component<Props> {
  constructor(props: Props) {
    super('div', props);
  }

  protected getAdditionalProps(): Partial<Props> {
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
