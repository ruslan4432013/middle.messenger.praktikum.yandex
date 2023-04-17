import { getMessageTime } from '@shared/lib';

import render from './chat-card.hbs';
import s from './chat-card.module.scss';

export const ChatCard = () => {
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
  return render(source);
};
