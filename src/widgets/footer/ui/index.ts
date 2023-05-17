import { AttachToChat } from '@features/attach-to-chat';
import { SendMessageInput } from '@features/send-message-input';
import { Component, validate } from '@shared/lib';

import render from './footer.hbs';
import s from './footer.module.scss';

type Props = {
  onSend?: (value: string) => void
} & PropType;

export class Footer extends Component<Props> {
  constructor(props: Props) {
    super('footer', props);
  }

  protected getAdditionalProps(props: Props): Partial<PropType> {
    const sendMessageInput = new SendMessageInput({
      name: 'message',
      validationFn: validate.message,
      inputProps: {
        attr: {
          class: s.input_message,
        },
      },
      events: {
        keydown: (evt) => {
          const isEnter = 'key' in evt && typeof evt.key === 'string' && evt.key === 'Enter';
          if (isEnter) {
            sendMessageInput.validate();
            if (sendMessageInput.isValid()) {
              props.onSend?.(sendMessageInput.value);
              sendMessageInput.setValue('');
            }
          }
        },
      },
      onSend() {
        sendMessageInput.validate();
        if (sendMessageInput.isValid()) {
          props.onSend?.(sendMessageInput.value);
          sendMessageInput.setValue('');
        }
      },
    });

    const components = {
      SendMessageInput: sendMessageInput,
      AttachToChat: new AttachToChat(),
    };
    return {
      ...s,
      ...components,
      attr: { class: s.footer },
    };
  }

  public render(): DocumentFragment {
    return this.compile(render, this.props);
  }
}
