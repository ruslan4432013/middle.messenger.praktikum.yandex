import { Path } from '@shared/config';
import { Component, router } from '@shared/lib';
import { connect } from '@shared/lib/store/connect';
import { AboutProfile } from '@widgets/about-profile';
import { ProfileSidebar } from '@widgets/profile-sidebar';

import render from './profile.hbs';

@router.use(Path.USER_PROFILE)
@connect((state) => ({
  user: state.user,
}))
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
