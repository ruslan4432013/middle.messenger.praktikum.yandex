import { AboutProfile } from '@widgets/about-profile';
import { ProfileSidebar } from '@widgets/profile-sidebar';
import s from './profile.module.scss';
import render from './profile.hbs';

export const ProfilePage = () => {
  const components = {
    AboutProfile: AboutProfile(),
    ProfileSidebar: ProfileSidebar(),
  };
  const source = { ...s, ...components };
  return render(source);
};
