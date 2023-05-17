import { apiInstance, WebSocketTransport } from '@shared/api';

const BASE_URL = (chatId: string) => `/chats/token/${chatId}`;

type GetWsTokenParams = {
  chatId: string
};

type TokenApi = {
  token: string
};

const getWsChatToken = async ({ chatId }: GetWsTokenParams) => {
  const res = await apiInstance.post(BASE_URL(chatId));

  if (res.ok) {
    return res.json<TokenApi>();
  }
  throw new Error(res.json().reason);
};

type GetWsTransportParams = {
  chatId: string;
  userId: string;
};

const WS_URL = ({ chatId, userId, token }: GetWsTransportParams & TokenApi) => `/chats/${userId}/${chatId}/${token}`;

export const getWsChatTransport = async ({ chatId, userId }: GetWsTransportParams) => {
  const { token } = await getWsChatToken({ chatId });
  return new WebSocketTransport(WS_URL({ chatId, userId, token }));
};
