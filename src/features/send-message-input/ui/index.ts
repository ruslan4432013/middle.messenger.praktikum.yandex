import { Field, type FieldProps } from '@shared/ui/field';
import { IconButton } from '@shared/ui/icon-button';

import sendIcon from './send-icon.svg';
import render from './send-message-input.hbs';
import s from './send-message-input.module.scss';

type Props = {
  onSend?: () => void
} & FieldProps;

export class SendMessageInput extends Field<Props> {
  private onClick = () => {
    this.validate();
    this.props.onSend?.();
  };

  protected getAdditionalProps(clearProps: FieldProps): Partial<FieldProps> {
    const self = this;
    const context = { name: 'message' };
    const fieldProps = super.getAdditionalProps(clearProps);
    const components = {
      IconButton: new IconButton({
        src: sendIcon,
        onClick() {
          self.onClick();
        },
      }),
    };
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
