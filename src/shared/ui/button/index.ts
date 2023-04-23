import { type PropType } from '@shared/lib';
import { Component } from '@shared/lib/component';

import s from './button.module.scss';

type Props = {
  text: string;
} & PropType;

export class Button extends Component<Props> {
  constructor(props: Props) {
    super('button', props);
  }

  protected getAdditionalProps(): Partial<Props> {
    return {
      attr: {
        class: s.button,
      },
    };
  }

  public override render() {
    const { text } = this.props;
    return this.compile(() => text, this.props);
  }
}
