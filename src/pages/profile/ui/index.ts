import { AboutProfile } from '@widgets/about-profile';
import { ProfileSidebar } from '@widgets/profile-sidebar';

import render from './profile.hbs';
import s from './profile.module.scss';

export const ProfilePage = () => {
  const components = {
    AboutProfile: AboutProfile(),
    ProfileSidebar: ProfileSidebar(),
  };
  const source = { ...s, ...components };
  return render(source);
};
