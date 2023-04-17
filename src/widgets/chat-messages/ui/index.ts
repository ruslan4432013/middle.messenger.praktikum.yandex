import { Message } from '@entities/message';

import render from './chat-messages.hbs';
import s from './chat-messages.module.scss';
import { text } from './mock';

export const ChatMessages = () => {
  const date = new Date();
  const components = {
    messages: [
      Message({
        variant: 'text', text, position: 'left', date,
      }),
      Message({
        variant: 'text', text, position: 'right', date,
      }),
      Message({
        variant: 'text', text, position: 'left', date,
      }),
      Message({
        variant: 'text', text, position: 'right', date,
      }),
    ],
  };
  const source = { ...s, ...components };
  return render(source);
};
