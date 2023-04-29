import { Message } from '@entities/message';
import { Component, type PropType } from '@shared/lib';

import render from './chat-messages.hbs';
import s from './chat-messages.module.scss';
import { text } from './mock';

export class ChatMessages extends Component {
  constructor() {
    super('div');
  }

  protected getAdditionalProps(): Partial<PropType> {
    const date = new Date();
    const components = {
      messages: [
        Message({
          variant: 'text',
          text,
          position: 'left',
          date,
        }),
        Message({
          variant: 'text',
          text,
          position: 'right',
          date,
        }),
        Message({
          variant: 'text',
          text,
          position: 'left',
          date,
        }),
        Message({
          variant: 'text',
          text,
          position: 'right',
          date,
        }),
      ],
    };
    return {
      ...s,
      ...components,
      attr: {
        class: s.message_container,
      },
    };
  }

  public render(): DocumentFragment {
    return this.compile(render, this.props);
  }
}
