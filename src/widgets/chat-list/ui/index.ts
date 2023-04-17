import { FindMessage } from '@features/find-message';
import { ChatCard } from '@entities/chat-card';
import { range } from '@shared/lib';
import s from './chat-list.module.scss';
import render from './chat-list.hbs';

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
