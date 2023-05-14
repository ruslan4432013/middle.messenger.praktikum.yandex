import render from './icon-button.hbs';
import s from './icon-button.module.scss';

import { cn, Component } from '../../lib';

type Props = {
  src: string;
} & PropType;

export class IconButton extends Component<Props> {
  constructor(props: Props) {
    super('button', props);
  }

  protected getAdditionalProps(clearProps: Props): Partial<Props> {
    return {
      attr: {
        class: cn(s.icon_button, clearProps?.attr?.class),
      },
    };
  }

  public render() {
    return this.compile(render, this.props);
  }
}
