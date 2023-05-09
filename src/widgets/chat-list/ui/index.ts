import { ChatCard } from '@entities/chat-card';
import { FindMessage } from '@features/find-message';
import { Path } from '@shared/config';
import { Component, type PropType, _ } from '@shared/lib';
import { Link } from '@shared/ui/link';

import render from './chat-list.hbs';
import s from './chat-list.module.scss';

export class ChatList extends Component {
  constructor() {
    super('div');
  }

  protected getAdditionalProps(): Partial<PropType> {
    const messages = _.range(15)
      .map(() => new ChatCard());

    const components = {
      FindMessage: FindMessage(),
      messages,
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

  public render() {
    return this.compile(render, this.props);
  }
}
