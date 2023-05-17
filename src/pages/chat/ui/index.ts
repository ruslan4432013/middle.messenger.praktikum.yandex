import { chatApi, type ChatDto, chatModel } from '@entities/chat';
import { sessionApi } from '@entities/session';
import { userLib } from '@entities/user';
import { type User, type WebSocketTransport } from '@shared/api';
import { Path } from '@shared/config';
import { Component, router } from '@shared/lib';
import { ChatList } from '@widgets/chat-list';
import { ChatMessages } from '@widgets/chat-messages';
import { Footer } from '@widgets/footer';
import { Header } from '@widgets/header';

import render from './chat.hbs';
import s from './chat.module.scss';

type InitSocketParams = {
  chatId: string
  userId: string
};

type ChatPageProps = {
  chats?: ChatDto[]
  user?: User,
} & PropType;
@router.use(Path.CHAT)
@userLib.connectUser
export class ChatPage extends Component<ChatPageProps> {
  private _wsTransport: WebSocketTransport;

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
    const chatId = chatModel.useChatId();
    const { user } = this.props;
    if (!user) {
      sessionApi.getMe().then((res) => {
        userLib.setUser(res);
        this._initChatSocket({
          chatId, userId: res.id.toString(),
        });
      });
    } else {
      this._initChatSocket({
        chatId, userId: user.id.toString(),
      });
    }
  }

  private async _initChatSocket(params: InitSocketParams) {
    this._wsTransport = await chatApi.getWsChatTransport(params);
  }

  public componentWillUnmount() {
    if (this._wsTransport) {
      this._wsTransport.close();
    }
  }

  public render() {
    return this.compile(render, this.props);
  }
}
