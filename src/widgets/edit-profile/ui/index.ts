import { ChangeAvatar } from '@features/change-avatar';
import { Component } from '@shared/lib/component';
import { connect } from '@shared/lib/store/connect';
import { Button } from '@shared/ui/button';
import { type ProfileField } from '@shared/ui/profile-field';

import render from './edit-profile.hbs';
import s from './edit-profile.module.scss';

type Props = {
  fields: ProfileField[]
  userName?: string
  onSubmit: (evt: Event) => void
} & PropType;

@connect((state) => ({ userName: state?.user?.firstName }))
export class EditProfile extends Component<Props> {
  constructor(props: Props) {
    super('div', props);
  }

  protected getAdditionalProps({ onSubmit }: Props): Partial<Props> {
    return {
      events: {
        submit: (evt) => {
          evt.preventDefault();
          onSubmit(evt);
        },
      },
      ChangeAvatar: new ChangeAvatar(),
      Button: new Button({
        text: 'Сохранить',
      }),
      ...s,
    };
  }

  public render(): DocumentFragment {
    return this.compile(render, this.props);
  }
}
