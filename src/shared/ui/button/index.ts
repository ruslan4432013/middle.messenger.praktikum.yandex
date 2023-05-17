import s from './button.module.scss';

import { Component } from '../../lib';

type Props = {
  text: string;
  type?: HTMLButtonElement['type'];
  onClick?: (evt: Event) => void
} & PropType;

export class Button extends Component<Props> {
  constructor(props: Props) {
    super('button', props);
  }

  protected getAdditionalProps(clearProps: Props): Partial<Props> {
    const { type, onClick } = clearProps;
    return {
      attr: {
        class: s.button,
        ...(type && { type }),
      },
      events: {
        click: (evt) => {
          onClick?.(evt);
        },
      },
    };
  }

  public override render() {
    const { text } = this.props;
    return this.compile(() => text, this.props);
  }
}
