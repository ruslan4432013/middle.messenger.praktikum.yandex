import { sessionApi } from '@entities/session';
import { userApi } from '@entities/user';
import { ChangeAvatar } from '@features/change-avatar';
import { store } from '@shared/lib';
import { Component } from '@shared/lib/component';
import { connect } from '@shared/lib/store/connect';
import { Button } from '@shared/ui/button';
import { type ProfileField } from '@shared/ui/profile-field';

import render from './edit-profile.hbs';
import s from './edit-profile.module.scss';

import { getUpdateParams } from '../lib';

type Props = {
  fields: ProfileField[]
  userName?: string
} & PropType;

@connect((state) => ({ userName: state?.user?.firstName }))
export class EditProfile extends Component<Props> {
  private readonly fields: ProfileField[] = [];

  constructor(props: Props) {
    super('div', props);
    this.fields = props.fields;
  }

  protected getAdditionalProps(): Partial<Props> {
    return {
      events: {
        submit: (evt) => {
          evt.preventDefault();
          const isValid = this.fields.every((f) => f.isValid());
          if (isValid && evt.target instanceof HTMLFormElement) {
            const formData = new FormData(evt.target);
            formData.delete('avatar');
            const updateData = getUpdateParams(formData);
            userApi.updateProfile(updateData).then(sessionApi.getMe).then((user) => store.set('user', user));
          }
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
