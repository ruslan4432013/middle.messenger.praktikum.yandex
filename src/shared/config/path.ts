export const ROOT_SELECTOR = '#root';

export enum Path {
  LOGIN = '/',
  HOME = '/home',
  REGISTER = '/sign-up',
  USER_SETTINGS = '/settings',
  USER_PROFILE = '/profile',
  CHAT = '/messenger/:chatId',
  CHANGE_PASSWORD = '/change-password',
  CLIENT_ERROR = '/404',
  SERVER_ERROR = '/500',
}
