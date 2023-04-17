import { ChatList } from '@widgets/chat-list';
import { ChatMessages } from '@widgets/chat-messages';
import { Footer } from '@widgets/footer';
import { Header } from '@widgets/header';

import render from './home.hbs';
import s from './home.module.scss';

type Props = {
  chatUuid: null | string
};

export const HomePage = ({ chatUuid }: Props) => {
  const context = {
    chatUuid,
  };
  const components = {
    ChatList: ChatList(),
    Header: Header(),
    Footer: Footer(),
    ChatMessages: ChatMessages(),
  };

  const source = {
    ...components,
    ...context,
    ...s,
  };
  return render(source);
};
