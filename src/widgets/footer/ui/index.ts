import { AttachToChat } from '@features/attach-to-chat';
import { SendMessageInput } from '@features/send-message-input';

import render from './footer.hbs';
import s from './footer.module.scss';

export const Footer = () => {
  const components = {
    SendMessageInput: SendMessageInput(),
    AttachToChat: AttachToChat(),
  };
  const source = { ...s, ...components };
  return render(source);
};
