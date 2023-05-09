import { Component } from '@shared/lib';
import { AboutProfile } from '@widgets/about-profile';
import { ProfileSidebar } from '@widgets/profile-sidebar';

import render from './profile.hbs';

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
