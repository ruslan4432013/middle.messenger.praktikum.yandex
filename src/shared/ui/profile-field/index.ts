import { type PropType } from '@shared/lib';
import { Field, type FieldProps } from '@shared/ui/field';

import render from './profile-field.hbs';
import s from './profile-field.module.scss';

type Props = {
  label: string;
  name: string;
  onlyRead?: boolean;
  fieldType?: 'text' | 'password' | 'tel';
} & FieldProps & PropType;

export class ProfileField extends Field<Props> {
  protected getAdditionalProps(clearProps: Props): Partial<Props> {
    const inputProps = {
      attr: {
        class: s.value_text,
        value: clearProps.value,
        type: clearProps.fieldType,
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
