import { useParams } from '@shared/lib';

export const useChatId = () => {
  const { chatId } = useParams<{ chatId: string }>();
  return chatId;
};
