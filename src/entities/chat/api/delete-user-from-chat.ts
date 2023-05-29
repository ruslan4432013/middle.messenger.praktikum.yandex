import { apiInstance } from '@shared/api';

const BASE_URL = '/chats/users';

type DeleteUserFromChatParams = {
  chatId: string
  userId: string
};

export const deleteUserFromChat = (params: DeleteUserFromChatParams) => {
  const { chatId, userId } = params;
  const users = [userId];
  return apiInstance.delete(BASE_URL, {
    data: { users, chatId },
  });
};
