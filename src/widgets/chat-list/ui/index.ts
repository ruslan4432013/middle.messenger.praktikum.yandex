import { ChatCard } from '@entities/chat-card';
import { FindMessage } from '@features/find-message';
import { Component, type PropType, range } from '@shared/lib';

import render from './chat-list.hbs';
import s from './chat-list.module.scss';

export class ChatList extends Component {
  constructor() {
    super('div');
  }

  protected getAdditionalProps(): Partial<PropType> {
    const messages = range(15)
      .map(() => new ChatCard());

    const components = {
      FindMessage: FindMessage(),
      messages,
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
