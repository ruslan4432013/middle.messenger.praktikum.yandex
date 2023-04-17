import { Navigation } from '@widgets/navigation';

import { LoginPage } from './home/modules/login';
import { SignInPage } from './home/modules/sign-in';
import { HomePage } from './home';
import { ProfilePage } from './profile';
import { UpdateProfilePage } from './update-profile';
import { ChangePasswordPage } from './change-password';
import { ClientErrorPage } from './404';
import { ServerErrorPage } from './500';

export const initNavigation = () => {
  const pages = {
    Вход: () => LoginPage(),
    Регистрация: () => SignInPage(),
    Домашняя: () => HomePage({ chatUuid: null }),
    Чат: () => HomePage({ chatUuid: 'some-chat' }),
    Профиль: () => ProfilePage(),
    'Обновить профиль': () => UpdateProfilePage(),
    'Изменить пароль': () => ChangePasswordPage(),
    'Страница 404': () => ClientErrorPage(),
    'Страница 500': () => ServerErrorPage(),

  };
  document.body.insertAdjacentHTML('beforeend', Navigation({ pages }));
};
