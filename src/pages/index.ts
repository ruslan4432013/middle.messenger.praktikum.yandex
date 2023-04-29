import { Navigation } from '@widgets/navigation';

import { ClientErrorPage } from './404';
import { ServerErrorPage } from './500';
import { ChangePasswordPage } from './change-password';
import { HomePage } from './home';
import { LoginPageView } from './login';
import { ProfilePage } from './profile';
import { SignInPageView } from './sign-in';
import { UpdateProfilePage } from './update-profile';

export const initNavigation = () => {
  const container = document.querySelector('#root')!;
  const pages = {
    Вход: () => new LoginPageView(container),
    Регистрация: () => new SignInPageView(container),
    Домашняя: () => new HomePage({ chatUuid: null }),
    Чат: () => new HomePage({ chatUuid: 'some-chat' }),
    Профиль: () => new ProfilePage(),
    'Обновить профиль': () => new UpdateProfilePage(),
    'Изменить пароль': () => new ChangePasswordPage(),
    'Страница 404': () => new ClientErrorPage(),
    'Страница 500': () => new ServerErrorPage(),

  };
  document.body.appendChild(new Navigation({ pages }).getContent());
};
