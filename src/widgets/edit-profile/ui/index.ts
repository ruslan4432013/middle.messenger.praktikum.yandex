import { ChangeAvatar } from '@features/change-avatar';
import { Component } from '@shared/lib/component';
import { Button } from '@shared/ui/button';
import { type ProfileField } from '@shared/ui/profile-field';

import render from './edit-profile.hbs';
import s from './edit-profile.module.scss';

type Props = {
  fields: ReturnType<typeof ProfileField>[]
};

export class EditProfile extends Component<Props> {
  constructor(props: Props) {
    const components = {
      ChangeAvatar: ChangeAvatar(),
      event: {
        onmouseover: () => {
          console.log('hello world');
        },
      },
      Button: new Button({
        text: 'Сохранить',
        events: {
          click: (e) => {
            e?.preventDefault();
            console.log('hello world');
          },
        },
      }),
      ...s,
    };
    Object.assign(props, components);
    super('div', props);
  }

  protected render(): DocumentFragment {
    return this.compile(render, this.props);
  }
}
