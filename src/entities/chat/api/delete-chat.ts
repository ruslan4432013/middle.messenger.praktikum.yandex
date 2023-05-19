import { apiInstance } from '@shared/api';

type DeleteChatParams = {
  chatId: string
};

const BASE_URL = '/chats';

export const deleteChat = ({ chatId }: DeleteChatParams) => apiInstance.delete(BASE_URL, {
  data: { chatId },
});
