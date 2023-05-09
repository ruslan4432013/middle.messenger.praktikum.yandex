import render from './profile-field.hbs';
import s from './profile-field.module.scss';

import { type PropType } from '../../lib';
import { Field, type FieldProps } from '../field';

type Props = {
  label: string;
  name: string;
  onlyRead?: boolean;
  fieldType: 'text' | 'password' | 'tel' | 'email';
} & FieldProps & PropType;

export class ProfileField extends Field<Props> {
  protected getAdditionalProps(clearProps: Props): Partial<Props> {
    const inputProps = {
      attr: {
        class: s.value_text,
        value: clearProps.value,
        type: clearProps.fieldType,
        ...(clearProps.onlyRead && { disabled: 'true' }),
      },
    } as FieldProps['inputProps'];
    const props = super.getAdditionalProps({ ...clearProps, inputProps });
    return {
      ...s,
      ...props,
      attr: {
        class: s.field_wrapper,
      },
    };
  }

  public render(): DocumentFragment {
    return this.compile(render, this.props);
  }
}
