import { Path } from '@shared/config';
import { Component } from '@shared/lib';
import { Link } from '@shared/ui/link';

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
      Link: new Link({
        to: Path.HOME,
        text: 'Назад к чатам',
        className: s.link,
      }),
      ...s,
    };
  }

  public render() {
    return this.compile(render, this.props);
  }
}
