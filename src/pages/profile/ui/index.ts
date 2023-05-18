import { sessionApi } from '@entities/session';
import { Path } from '@shared/config';
import { Component, router, connect } from '@shared/lib';
import { AboutProfile } from '@widgets/about-profile';
import { ProfileSidebar } from '@widgets/profile-sidebar';

import render from './profile.hbs';

@router.use(Path.USER_PROFILE)
@connect((state) => ({
  user: state.user,
}))
@sessionApi.requiredAuth
export class ProfilePage extends Component {
  constructor() {
    super('div');
  }

  protected getAdditionalProps() {
    const components = {
      AboutProfile: new AboutProfile(),
      ProfileSidebar: new ProfileSidebar(),
    };
    return {
      ...components,
    };
  }

  public render() {
    return this.compile(render, this.props);
  }
}
