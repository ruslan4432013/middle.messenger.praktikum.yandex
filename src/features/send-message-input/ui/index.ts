import { type PropType } from '@shared/lib';
import { Field } from '@shared/ui/field';
import { IconButton } from '@shared/ui/icon-button';

import sendIcon from './send-icon.svg';
import render from './send-message-input.hbs';
import s from './send-message-input.module.scss';

export class SendMessageInput extends Field {
  private onClick = () => {
    console.log({
      [this.props.name]: this.value,
    });
    this.validate();
  };

  protected getAdditionalProps(): Partial<PropType> {
    const components = {
      IconButton: new IconButton({
        src: sendIcon,
        events: {
          click: () => {
            this.onClick();
          },
        },
      }),
    };
    const context = { name: 'message' };
    const fieldProps = super.getAdditionalProps();
    return {
      ...s,
      ...context,
      ...components,
      attr: {
        class: s.input_message_wrapper,
      },
      ...fieldProps,
    };
  }

  public render() {
    return this.compile(render, this.props);
  }
}
