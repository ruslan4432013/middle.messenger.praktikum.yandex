import { type ChatDto } from '@entities/chat';
import { Path } from '@shared/config';
import { Component, router } from '@shared/lib';
import { ChatList } from '@widgets/chat-list';
import { ChatMessages } from '@widgets/chat-messages';
import { Footer } from '@widgets/footer';
import { Header } from '@widgets/header';

import render from './chat.hbs';
import s from './chat.module.scss';

type ChatPageProps = {
  chats?: ChatDto[]
} & PropType;

@router.use(Path.CHAT)
export class ChatPage extends Component<ChatPageProps> {
  constructor(props?: ChatPageProps) {
    super('div', props);
  }

  protected getAdditionalProps() {
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

  protected componentDidMount() {
    const params = router.useParams();
    console.log(params);
  }

  protected componentDidUpdate(): boolean {
    return false;
  }

  public render() {
    return this.compile(render, this.props);
  }
}
