import { API_URL } from '@shared/config';
import {
  cn,
  Component, getMessageTime, router,
} from '@shared/lib';

import render from './chat-card.hbs';
import s from './chat-card.module.scss';

type ChatCardProps = {
  chatId: string | number
  title: string
  lastMessage?: null | string
  unreadCount: number
  avatar?: null | string
} & PropType;

export class ChatCard extends Component<ChatCardProps> {
  constructor(props: ChatCardProps) {
    const lastMessage = props.lastMessage ? props.lastMessage : 'Начните набирать сообщение';
    super('li', { ...props, lastMessage });
  }

  protected getAdditionalProps({ chatId }: ChatCardProps): Partial<ChatCardProps> {
    const params = router.useParams();
    const isActive = chatId.toString() === params.chatId;
    return {
      attr: {
        class: cn(s.user_chat_card, {
          [s.active_card]: isActive,
        }),
      },
      events: {
        click: () => {
          router.go(`/messenger/${chatId}`);
        },
      },
    };
  }

  public render() {
    const { props } = this;
    const userName = props.title;
    const userIcon = props.avatar ? `${API_URL}/resources${this.props.avatar}` : 'https://via.placeholder.com/47x47';
    const userMessage = props.lastMessage ? props.lastMessage : 'Начните набирать сообщение';
    const date = new Date();
    const { messageTime, isoTime } = getMessageTime(date);
    const newMessagesCount = props.unreadCount;
    const context = {
      userIcon, userName, userMessage, isoTime, messageTime, newMessagesCount,
    };
    const source = { ...s, ...context, ...this.props };
    return this.compile(render, source);
  }
}
