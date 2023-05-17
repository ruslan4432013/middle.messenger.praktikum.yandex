import { ChatCard, chatApi, type ChatDto } from '@entities/chat';
import { ChatActions } from '@features/chat-actions';
import { FindMessage } from '@features/find-message';
import { Path } from '@shared/config';
import {
  Component, _, connect, store,
} from '@shared/lib';
import { ActionsDropdown } from '@shared/ui/dropdown';
import { Link } from '@shared/ui/link';

import render from './chat-list.hbs';
import s from './chat-list.module.scss';

type ChatListProps = {
  chats?: ChatDto[]
  messages?: ChatCard[]
} & PropType;

@connect((state) => ({ chats: state.chats }))
export class ChatList extends Component<ChatListProps> {
  constructor(props?: ChatListProps) {
    super('div', props);
  }

  protected getAdditionalProps(): Partial<PropType> {
    const dropdown = new ActionsDropdown({
      actions: [new ChatActions.CreateChat()],
      classNamePosition: s.dropdown_menu__position,
    });
    const components = {
      FindMessage: FindMessage(),
      ChatActionsDropdown: dropdown,
      Link: new Link({
        to: Path.USER_PROFILE,
        text: 'Профиль',
        className: s.profile_link,
      }),
    };
    return {
      ...components,
      ...s,
    };
  }

  protected componentDidUpdate(oldProps: ChatListProps, newProps: ChatListProps): boolean {
    const oldChats = oldProps.chats;
    const newChats = newProps.chats;
    if (!oldChats && newChats) {
      const messages = this._getMessagesFromChats(newChats);
      this.setProps({ messages });
      return true;
    }
    if (!_.isArrayOrObject(newChats) || !_.isArrayOrObject(oldChats)) return true;
    if (!_.isEqual(oldChats, newChats)) {
      const messages = this._getMessagesFromChats(newChats);
      this.setProps({ messages });
    }
    return super.componentDidUpdate(oldProps, newProps);
  }

  protected componentDidMount() {
    if (!this.props.chats) {
      chatApi.getChats().then((chats) => {
        store.set('chats', chats);
      });
    } else {
      const messages = this._getMessagesFromChats(this.props.chats);
      this.setProps({ messages });
    }
  }

  private _getMessagesFromChats(chats: ChatDto[]) {
    return chats.map((el) => new ChatCard({
      chatId: el.id,
      unreadCount: el.unread_count,
      title: el.title,
    }));
  }

  public render() {
    return this.compile(render, this.props);
  }
}
