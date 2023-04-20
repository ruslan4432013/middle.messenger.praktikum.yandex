import { Navigation } from '@widgets/navigation';

import { ClientErrorPage } from './404';
import { ServerErrorPage } from './500';
import { ChangePasswordPage } from './change-password';
import { HomePage } from './home';
import { LoginPage } from './home/modules/login';
import { SignInPage } from './home/modules/sign-in';
import { ProfilePage } from './profile';
// import { UpdateProfilePage } from './update-profile';

export const initNavigation = () => {
  const pages = {
    Вход: () => LoginPage(),
    Регистрация: () => SignInPage(),
    Домашняя: () => HomePage({ chatUuid: null }),
    Чат: () => HomePage({ chatUuid: 'some-chat' }),
    Профиль: () => ProfilePage(),
    'Обновить профиль': () => '',
    'Изменить пароль': () => ChangePasswordPage(),
    'Страница 404': () => ClientErrorPage(),
    'Страница 500': () => ServerErrorPage(),

  };
  document.body.appendChild(new Navigation({ pages }).getContent());
};
