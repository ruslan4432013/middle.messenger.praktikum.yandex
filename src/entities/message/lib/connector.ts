import { connect, store } from '@shared/lib';

import { type MessageDto } from '..';

export const connectMessages = connect((state) => ({ messages: state.messages }));

export const setMessages = (messages: MessageDto[]) => store.set('messages', messages);

declare global {
  interface StateStore {
    messages: MessageDto[]
  }
}
