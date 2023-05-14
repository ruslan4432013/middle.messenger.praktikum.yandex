import { Component } from '@shared/lib';

import render from './error.hbs';
import s from './error.module.scss';

type Props = {
  errorCode: number;
  errorMessage: string;
} & PropType;

export class Error extends Component<Props> {
  constructor(props: Props) {
    super('main', props);
  }

  protected getAdditionalProps(): Partial<Props> {
    return {
      ...s,
    };
  }

  public render() {
    return this.compile(render, this.props);
  }
}
