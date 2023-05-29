import { API_URL, Path } from '@shared/config';
import {
  cn,
  Component, getMessageTime, router,
} from '@shared/lib';
import { AuthField } from '@shared/ui/auth-field';
import { IconButton } from '@shared/ui/icon-button';
import { Modal } from '@shared/ui/modal';
import { ModalContent } from '@shared/ui/modal-content';
import { toast } from '@shared/ui/toast';

import render from './chat-card.hbs';
import s from './chat-card.module.scss';
import trashIcon from './trash-icon.svg';

import { deleteChat, getChats } from '../api';
import { setChats } from '../lib';

type ChatCardProps = {
  chatId: string | number
  title: string
  lastMessage?: null | string
  unreadCount: number
  avatar?: null | string
} & PropType;

export class ChatCard extends Component<ChatCardProps> {
  private _modal: Modal;

  constructor(props: ChatCardProps) {
    const lastMessage = props.lastMessage ? props.lastMessage : 'Начните набирать сообщение';
    super('li', { ...props, lastMessage });
    const field = new AuthField({
      fieldType: 'text',
      label: `Введите ${this.props.title} для удаления чата`,
      id: 'delete-chat-field',
      errorMessage: 'Название чата не совпадает',
      validationFn(value) {
        return value === props.title;
      },
    });
    const self = this;
    this._modal = new Modal({
      Content: new ModalContent({
        title: 'Удалить чат?',
        fields: [field],
        buttonText: 'Удалить чат',
        onClick() {
          field.validate();
          if (field.isValid()) {
            const chatId = props.chatId.toString();
            deleteChat({ chatId }).then((res) => {
              if (res.ok) {
                getChats().then((chats) => {
                  setChats(chats);
                  toast.success(`Чат ${props.title} был удален`);
                  self._modal.hide();
                  router.go(Path.HOME);
                });
              } else {
                toast.error(`Чат ${props.title} не получается удалить`);
                console.error(res.json().reason);
              }
            });
          }
        },
      }),
    });
  }

  protected getAdditionalProps({ chatId }: ChatCardProps): Partial<ChatCardProps> {
    const params = router.useParams();
    const isActive = chatId.toString() === params.chatId;
    const self = this;
    const deleteIcon = new IconButton({
      src: trashIcon,
      attr: {
        class: s.delete_icon,
      },
      onClick(evt) {
        evt.stopPropagation();
        self._modal.show();
      },
    });
    return {
      DeleteIcon: deleteIcon,
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
