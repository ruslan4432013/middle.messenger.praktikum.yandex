import * as s from './profile.module.scss'
import render from './profile.hbs'
import { AboutProfile } from '@widgets/about-profile'
import { ProfileSidebar } from '@widgets/profile-sidebar'

export const ProfilePage = () => {
  const components = {
    AboutProfile: AboutProfile(),
    ProfileSidebar: ProfileSidebar()
  }
  const source = { ...s, ...components }
  return render(source)
}
