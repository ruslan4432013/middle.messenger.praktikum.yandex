import { Component, type PropType } from '@shared/lib';

import render from './auth-form.hbs';
import s from './auth-form.module.scss';

type Props = {
  fields: Component[];
  titleText: string;
  Button: Component;
  linkText: string;
  minHeight?: string;
} & PropType;

export class AuthForm extends Component<Props> {
  constructor(props: Props) {
    super('main', props);
  }

  protected getAdditionalProps(): Partial<Props> {
    const props = {
      ...s,
    };
    return props;
  }

  public render(): DocumentFragment {
    return this.compile(render, this.props);
  }
}
