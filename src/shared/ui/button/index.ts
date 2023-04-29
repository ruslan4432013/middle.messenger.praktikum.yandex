import { type PropType } from '@shared/lib';
import { Component } from '@shared/lib/component';

import s from './button.module.scss';

type Props = {
  text: string;
  type?: HTMLButtonElement['type']
} & PropType;

export class Button extends Component<Props> {
  constructor(props: Props) {
    super('button', props);
  }

  protected getAdditionalProps(clearProps: Props): Partial<Props> {
    const { type } = clearProps;
    return {
      attr: {
        class: s.button,
        ...(type && { type }),
      },
    };
  }

  public override render() {
    const { text } = this.props;
    return this.compile(() => text, this.props);
  }
}
