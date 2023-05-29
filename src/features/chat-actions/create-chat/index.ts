import { chatApi } from '@entities/chat';
import { Component, router, store } from '@shared/lib';
import { AuthField } from '@shared/ui/auth-field';
import { Modal } from '@shared/ui/modal';
import { ModalContent } from '@shared/ui/modal-content';
import { toast } from '@shared/ui/toast';

import render from './create-chat.hbs';
import plusIcon from './plus_icon.svg';
import s from './styles.module.scss';

export class CreateChat extends Component {
  private _modal: Modal;

  constructor() {
    super('button');
    const chatNameField = new AuthField({
      fieldType: 'text',
      label: 'Название чата',
      id: 'chat-name',
      name: 'title',
      validationFn(value) {
        return value.length > 3;
      },
      errorMessage: 'Название чата слишком короткое',
    });
    const modal = new Modal({
      Content: new ModalContent({
        title: 'Создать новый чат',
        buttonText: 'Создать',
        fields: [chatNameField],
        onClick: () => {
          chatNameField.validate();
          if (chatNameField.isValid()) {
            const title = chatNameField.value;
            chatApi.createChat({ title }).then((res) => {
              if (res.ok) {
                toast.success(`Chat ${title} created`);
                chatApi.getChats().then((chats) => {
                  const newChat = chats.find((chat) => chat.title === title);
                  if (newChat) {
                    this._modal.hide();
                    store.set('chats', chats);
                    router.go(`/messenger/${newChat.id}`);
                  }
                });
              } else {
                toast.error(res.json().reason);
              }
            });
          }
        },
      }),
    });
    this._modal = modal;
  }

  protected getAdditionalProps(): PropType {
    return {
      plusIcon,
      attr: {
        class: s.button,
      },
      events: {
        click: () => {
          this._modal.show();
        },
      },
    };
  }

  public render(): DocumentFragment {
    return this.compile(render, this.props);
  }
}
