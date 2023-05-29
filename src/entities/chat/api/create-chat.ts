import { apiInstance } from '@shared/api';

const BASE_URL = '/chats';

type CreateChatParams = {
  title: string
};

export const createChat = (params: CreateChatParams) => apiInstance.post(BASE_URL, {
  data: params,
});
