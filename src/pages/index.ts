import { Path } from '@shared/config';
import { RouterDOM } from '@shared/lib';

import { ChangePasswordPage } from './change-password';
import { ChatPage } from './chat';
import { HomePage } from './home';
import { LoginPageView } from './login';
import { ProfilePage } from './profile';
import { SignInPageView } from './sign-in';
import { UpdateProfilePage } from './update-profile';

export const router = new RouterDOM.Router('#root');

router
  .use(Path.LOGIN, LoginPageView)
  .use(Path.REGISTER, SignInPageView)
  .use(Path.USER_SETTINGS, UpdateProfilePage)
  .use(Path.USER_PROFILE, ProfilePage)
  .use(Path.CHANGE_PASSWORD, ChangePasswordPage)
  .use(Path.CHAT, ChatPage)
  .use(Path.HOME, HomePage);
