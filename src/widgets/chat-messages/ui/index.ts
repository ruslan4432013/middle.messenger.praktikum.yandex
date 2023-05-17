import {
  Message, messageLib, type SendMessageResponse,
} from '@entities/message';
import { userLib } from '@entities/user';
import { Component, _ } from '@shared/lib';

import render from './chat-messages.hbs';
import s from './chat-messages.module.scss';

type ChatMessagesProps = {
  messages?: StateStore['messages'],
  messageComponents?: Message[],
  user?: StateStore['user'],
} & PropType;

@userLib.connectUser
@messageLib.connectMessages
export class ChatMessages extends Component<ChatMessagesProps> {
  constructor(props?: ChatMessagesProps) {
    super('div', props);
  }

  public componentDidMount() {
    if (this.props.messages) {
      const messageComponents = this.getMessages(this.props.messages);
      this.setProps({ messageComponents });
    }
  }

  protected componentDidUpdate(oldProps: ChatMessagesProps, newProps: ChatMessagesProps): boolean {
    if (!oldProps.messages && newProps.messages && newProps.messages.length > 0) {
      const messageComponents = this.getMessages(newProps.messages);
      this.setProps({ messageComponents });
    }
    if (_.isArrayOrObject(oldProps.messages)
      && _.isArrayOrObject(newProps.messages)
      && !_.isEqual(oldProps.messages, newProps.messages)) {
      const messageComponents = this.getMessages(newProps.messages);
      this.setProps({ messageComponents });
    }
    return true;
  }

  public addMessage(message: SendMessageResponse) {
    const newMessage = new Message({
      variant: 'text',
      text: message.content,
      position: message.user_id === this.props.user?.id ? 'right' : 'left',
      date: new Date(message.time),
    });
    const currentMessages = this.getMessages(this.props.messages || []);
    this.props.messages?.push(message);
    currentMessages.push(newMessage);
    currentMessages.sort((a, b) => a.props.date.getTime() - b.props.date.getTime());

    this.setProps({ messageComponents: currentMessages });
  }

  public scrollDown() {
    const element = this.getContent();
    element.scrollTo(0, element.scrollHeight);
  }

  private getMessages(messages: StateStore['messages']) {
    const userId = this.props.user?.id;
    return messages.map((el) => new Message({
      variant: 'text',
      text: el.content,
      date: new Date(el.time),
      position: el.user_id === userId ? 'right' : 'left',
    })).sort((a, b) => a.props.date.getTime() - b.props.date.getTime());
  }

  protected getAdditionalProps(): Partial<PropType> {
    return {
      ...s,
      attr: {
        class: s.message_container,
      },
    };
  }

  public render(): DocumentFragment {
    return this.compile(render, this.props);
  }
}
