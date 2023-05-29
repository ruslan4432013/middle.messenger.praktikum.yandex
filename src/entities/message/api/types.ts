export interface MessageDto {
  id: number;
  user_id: number;
  chat_id?: number;
  type: string;
  time: string;
  content: string;
  is_read?: boolean;
  file?: unknown;
}

export interface SendMessageResponse {
  content: string;
  type: string;
  time: string;
  user_id: number;
  id: number;
}
