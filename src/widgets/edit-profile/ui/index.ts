import { ChangeAvatar } from '@features/change-avatar';
import { type PropType } from '@shared/lib';
import { Component } from '@shared/lib/component';
import { Button } from '@shared/ui/button';
import { type ProfileField } from '@shared/ui/profile-field';

import render from './edit-profile.hbs';
import s from './edit-profile.module.scss';

type Props = {
  fields: ProfileField[]
} & PropType;

export class EditProfile extends Component<Props> {
  private readonly fields: ProfileField[] = [];

  constructor(props: Props) {
    super('div', props);
    this.fields = props.fields;
  }

  protected getAdditionalProps(): Partial<Props> {
    return {
      ChangeAvatar: new ChangeAvatar(),
      Button: new Button({
        text: 'Сохранить',
        events: {
          click: (e) => {
            e.preventDefault();
            const printedObject = this.fields.reduce((acc, val) => {
              acc[val.props.name] = val.value;
              return acc;
            }, {} as Record<string, string>);
            console.log(printedObject);
            this.fields.forEach((field) => {
              field.validate();
            });
          },
        },
      }),
      ...s,
    };
  }

  public render(): DocumentFragment {
    return this.compile(render, this.props);
  }
}
