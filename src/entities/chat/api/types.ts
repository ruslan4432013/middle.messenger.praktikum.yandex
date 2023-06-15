export interface ChatDto {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message?: LastMessage;
}

interface LastMessage {
  user: User;
  time: string;
  content: string;
}

export type UserChatDto = {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string
  login: string,
  email: string,
  phone: string,
  avatar: string,
  role: string
};

interface User {
  first_name: string;
  second_name: string;
  avatar: string;
  email: string;
  login: string;
  phone: string;
}
