import { Component, getMessageTime } from '@shared/lib';

import { UnexpectedError } from './error';
import { ImageMessage, type ImageMessageProps } from './image-message';
import render from './message.hbs';
import s from './message.module.scss';
import { TextMessage, type TextMessageProps } from './text-message';

type PositionProps = {
  position: 'left' | 'right'
};

type ComplexProps = ImageMessageProps | TextMessageProps;

type MessageProps = ComplexProps & PositionProps & {
  date: Date
};

export class Message extends Component<MessageProps> {
  constructor(props: MessageProps) {
    const {
      variant,
      position,
      date,
    } = props;

    let Body: string;
    switch (variant) {
      case 'image':
        Body = ImageMessage(props);
        break;
      case 'text':
        Body = TextMessage(props);
        break;
      default:
        throw new UnexpectedError(variant);
    }

    const {
      isoTime,
      messageTime,
    } = getMessageTime(date);

    const styles = {
      ...s,
      ...(position === 'right' && {
        message_wrapper: `${s.message_wrapper} ${s.right_message} ${s.message_wrapper__owner}`,
        time_wrapper: `${s.time_wrapper} ${s.time_wrapper__owner}`,
        time_extra: `${s.time_extra} ${s.time_extra__owner}`,
      }),
    };

    const context = {
      messageTime,
      isoTime,
    };

    const components = {
      Body,
    };

    const source = {
      ...styles, ...components, ...context, ...props,
    };
    super('div', source);
  }

  public render(): DocumentFragment {
    return this.compile(render, this.props);
  }
}
