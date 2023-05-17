import {
  type ChatDto, chatModel,
} from '@entities/chat';
import { messageApi, messageLib } from '@entities/message';
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
@sessionApi.requiredAuth
@userLib.connectUser
export class ChatPage extends Component<ChatPageProps> {
  private _wsTransport: WebSocketTransport;

  private _chatMessages: ChatMessages;

  constructor(props?: ChatPageProps) {
    const chatMessages = new ChatMessages();
    const source = {
      ChatMessages: chatMessages,
      ...props,
    };
    super('div', source);
    this._chatMessages = chatMessages;
  }

  protected getAdditionalProps() {
    const self = this;
    const components = {
      ChatList: new ChatList(),
      Header: new Header(),
      Footer: new Footer({
        onSend(value) {
          self.sendMessage(value);
        },
      }),
    };

    return {
      ...components,
      ...s,
    };
  }

  public componentDidMount() {
    const chatId = chatModel.useChatId();
    const { user } = this.props;
    if (!user) {
      sessionApi.getMe()
        .then((res) => {
          userLib.setUser(res);
          this._initChatSocket({
            chatId,
            userId: res.id.toString(),
          });
        });
    } else {
      this._initChatSocket({
        chatId,
        userId: user.id.toString(),
      });
    }
  }

  private _onMessage(event: MessageEvent) {
    if (typeof event.data === 'string') {
      const res = messageLib.parseMessage(event.data);
      if (res.type === 'getOld') {
        this._chatMessages.setProps({ messages: res.data });
      }
      if (res.type === 'onSend') {
        this._chatMessages.addMessage(res.data);
      }
      this._chatMessages.scrollDown();
    }
  }

  private sendMessage(value: string) {
    if (this._wsTransport) {
      this._wsTransport.send(messageLib.createMessage(value));
    }
  }

  private async _initChatSocket(params: InitSocketParams) {
    const self = this;
    this._wsTransport = await messageApi.getWsChatTransport(params, {
      onMessage(event) {
        self._onMessage(event);
      },
      onClose(event) {
        // если произошел обрыв соединения
        if (event.code === 1006) {
          self._initChatSocket(params);
        }
      },
      onOpen() {
        self._wsTransport.send(messageLib.createMessageGetOld(0));
      },
    });
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
