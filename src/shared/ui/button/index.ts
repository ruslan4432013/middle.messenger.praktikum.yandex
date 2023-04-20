import { Component } from '@shared/lib/component';

import s from './button.module.scss';

type Props = {
  text: string;
  events?: {
    click?: (e?: Event) => void
  },
  attr?: {
    class?: string
  },
  className?: string
};

export class Button extends Component<Props> {
  constructor(props: Props) {
    const addedProps = {
      attr: {
        class: s.auth_button,
      },
    };
    Object.assign(props, addedProps);
    super('button', props);
  }

  protected override render() {
    const { text } = this.props;
    return this.compile(() => text, this.props);
  }
}
