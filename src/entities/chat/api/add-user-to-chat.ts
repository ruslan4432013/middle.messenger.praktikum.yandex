import { apiInstance } from '@shared/api';

const BASE_URL = '/chats/users';

type AddUserToChatParams = {
  userId: string,
  chatId: string
};

export const addUserToChat = (params: AddUserToChatParams) => {
  const { userId, chatId } = params;
  const users = [userId];
  return apiInstance.put(BASE_URL, {
    data: {
      users,
      chatId,
    },
  });
};
