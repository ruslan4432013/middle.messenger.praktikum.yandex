import { type ChatDto, chatLib } from '@entities/chat';
import { ChatActions } from '@features/chat-actions';
import { Component, useParams } from '@shared/lib';
import { ActionsDropdown } from '@shared/ui/dropdown';

import render from './header.hbs';
import s from './header.module.scss';

type HeaderProps = {
  chats?: ChatDto[],
  chatTitle?: string,
  chatId?: string
} & PropType;

@chatLib.connectChat
export class Header extends Component<HeaderProps> {
  private _chatTitle = '';

  constructor(props?: HeaderProps) {
    super('header', props);
  }

  protected getAdditionalProps(): Partial<PropType> {
    const addUserAction = new ChatActions.AddUserToChat();
    const removeUserAction = new ChatActions.RemoveUserFromChat();
    const dropdown = new ActionsDropdown({
      actions: [addUserAction, removeUserAction],
      classNamePosition: s.dropdown_menu__position,
    });
    const context = {
      userIcon: 'https://via.placeholder.com/34x34',
      chatTitle: '',
      Dropdown: dropdown,
    };
    return {
      ...s,
      ...context,
      attr: { class: s.header },
    };
  }

  public componentDidMount() {
    this._setChat(this.props);
  }

  protected componentDidUpdate(_oldProps: HeaderProps, newProps: HeaderProps): boolean {
    if (this._chatTitle) {
      return false;
    }
    this._setChat(newProps);
    return true;
  }

  private _setChat(props: HeaderProps) {
    const { chatId } = useParams<{ chatId: string }>();
    const chat = props.chats?.find((c) => c.id.toString() === chatId);

    if (chat) {
      this.setProps({
        chatTitle: chat.title,
        chatId: props.chatId,
      });
      this._chatTitle = chat?.title || '';
    }
  }

  public render() {
    return this.compile(render, this.props);
  }
}
