import { type PropType } from '@shared/lib';
import { Field, type FieldProps } from '@shared/ui/field';

import render from './auth-field.hbs';
import s from './auth-field.module.scss';

type Props = {
  fieldType: 'password' | 'text' | 'email' | 'tel';
  label: string;
  id: string;
} & FieldProps & PropType;

export class AuthField extends Field<Props> {
  protected getAdditionalProps(): Partial<Props> {
    const props = super.getAdditionalProps();
    return {
      attr: {
        class: s.field,
      },
      ...props,
    };
  }

  public render(): DocumentFragment {
    return this.compile(render, this.props);
  }
}
