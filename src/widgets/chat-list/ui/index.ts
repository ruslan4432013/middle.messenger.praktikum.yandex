import { ChatCard } from '@entities/chat-card';
import { FindMessage } from '@features/find-message';
import { range } from '@shared/lib';

import render from './chat-list.hbs';
import s from './chat-list.module.scss';

export const ChatList = () => {
  const messages = range(15).map(ChatCard);

  const components = {
    FindMessage: FindMessage(),
  };
  const source = {
    ...components,
    messages,
    ...s,
  };
  return render(source);
};
