import { connect, store } from '@shared/lib';

import { type ChatDto } from '..';

export const connectChat = connect((state) => ({ chats: state.chats }));

export const setChats = (chats: ChatDto[]) => store.set('chats', chats);

declare global {
  interface StateStore {
    chats: ChatDto[]
  }
}
