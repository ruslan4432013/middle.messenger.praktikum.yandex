import { apiInstance } from '@shared/api';

import { type UserChatDto } from './types';

const BASE_URL = (chatId: string) => `/chats/${chatId}/users`;

type Params = {
  chatId: string
  limit?: number
};

export const getUsersByChat = async ({ chatId, limit = 100 }: Params) => {
  const res = await apiInstance.get(BASE_URL(chatId), {
    data: { limit },
  });
  if (res.ok) {
    return res.json<UserChatDto[]>();
  }
  throw new Error(res.json().reason);
};
