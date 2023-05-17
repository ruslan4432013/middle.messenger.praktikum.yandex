import { apiInstance } from '@shared/api';

import { type ChatDto } from './types';

const BASE_URL = '/chats';

type GetChatParams = {
  limit?: string;
  offset?: string;
  title?: string;
};

export const getChats = async (params: GetChatParams = {}) => {
  const {
    limit = '100',
    ...other
  } = params;
  const res = await apiInstance.get(BASE_URL, {
    data: { limit, ...other },
  });
  if (res.ok) {
    return res.json<ChatDto[]>();
  }
  throw new Error(res.data);
};
