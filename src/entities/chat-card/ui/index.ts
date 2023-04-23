import { Component, getMessageTime, type PropType } from '@shared/lib';

import render from './chat-card.hbs';
import s from './chat-card.module.scss';

export class ChatCard extends Component {
  constructor() {
    super('li');
  }

  protected getAdditionalProps(): Partial<PropType> {
    return {
      attr: {
        class: s.user_chat_card,
      },
    };
  }

  public render() {
    const userName = 'Андрей';
    const userIcon = 'https://via.placeholder.com/47x47';
    const userMessage = 'Друзья, у меня для вас особенный выпуск новостей!...';
    const date = new Date();
    const { messageTime, isoTime } = getMessageTime(date);
    const newMessagesCount = 4;
    const context = {
      userIcon, userName, userMessage, isoTime, messageTime, newMessagesCount,
    };
    const source = { ...s, ...context };
    return this.compile(render, source);
  }
}
