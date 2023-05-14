import render from './auth-field.hbs';
import s from './auth-field.module.scss';

import { Field, type FieldProps } from '../field';

type Props = {
  fieldType: 'password' | 'text' | 'email' | 'tel';
  label: string;
  id: string;
} & FieldProps & PropType;

export class AuthField extends Field<Props> {
  protected getAdditionalProps(clearProps: Props): Partial<Props> {
    const inputProps = {
      attr: {
        type: clearProps.fieldType,
        id: clearProps.id,
        name: clearProps.name,
      },
    } as FieldProps['inputProps'];
    const props = super.getAdditionalProps({ ...clearProps, inputProps });
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
