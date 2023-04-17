import { AboutProfile } from '@widgets/about-profile';
import { ProfileSidebar } from '@widgets/profile-sidebar';

import render from './profile.hbs';

export const ProfilePage = () => {
  const components = {
    AboutProfile: AboutProfile(),
    ProfileSidebar: ProfileSidebar(),
  };
  const source = { ...components };
  return render(source);
};
