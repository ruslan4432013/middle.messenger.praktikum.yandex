import { AttachToChat } from '@features/attach-to-chat';
import { SendMessageInput } from '@features/send-message-input';
import { Component, validate } from '@shared/lib';

import render from './footer.hbs';
import s from './footer.module.scss';

export class Footer extends Component {
  constructor() {
    super('footer');
  }

  protected getAdditionalProps(): Partial<PropType> {
    const components = {
      SendMessageInput: new SendMessageInput({ name: 'message', validationFn: validate.message }),
      AttachToChat: new AttachToChat(),
    };
    return { ...s, ...components, attr: { class: s.footer } };
  }

  public render(): DocumentFragment {
    return this.compile(render, this.props);
  }
}
