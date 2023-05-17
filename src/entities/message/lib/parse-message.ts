import type { SendMessageResponse, MessageDto } from '..';

type OnSendMessage = {
  type: 'onSend',
  data: SendMessageResponse
};

type OnGetOldMessage = {
  type: 'getOld',
  data: MessageDto[]
};

type ParsedResult = OnGetOldMessage | OnSendMessage;

export const parseMessage = (data: string): ParsedResult => {
  const parsed = JSON.parse(data);
  if (Array.isArray(parsed)) {
    return {
      type: 'getOld',
      data: parsed,
    };
  }
  return {
    type: 'onSend',
    data: parsed,
  };
};
