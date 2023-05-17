import { chatApi } from '@entities/chat';
import {
  Component, useParams,
} from '@shared/lib';
import { Modal } from '@shared/ui/modal';

import render from './delete-user-from-chat.hbs';
import minusIcon from './minus_icon.svg';
import s from './styles.module.scss';
import { UserList } from './user-list/user-list';

export class RemoveUserFromChat extends Component {
  private _modal: Modal;

  constructor() {
    super('button');
    const children = new UserList();

    const modal = new Modal({
      Content: children,
      onOpen() {
        const { chatId } = useParams<{ chatId: string }>();
        chatApi.getUsersByChat({ chatId }).then((res) => {
          children.setUsers(res);
        });
      },
    });
    this._modal = modal;
  }

  protected getAdditionalProps(): PropType {
    return {
      minusIcon,
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
