import { Component } from '../../../lib';
import s from '../styles.module.scss';

type OverlayProps = {
  onClick?: () => void
} & PropType;
export class Overlay extends Component<OverlayProps> {
  constructor(props?: OverlayProps) {
    const source: PropType = {
      attr: {
        class: s.overlay,
      },
      events: {
        click: () => {
          props?.onClick?.();
        },
      },
    };
    super('div', { ...props, ...source });
  }

  public render(): DocumentFragment {
    return this.compile(() => '', this.props);
  }
}
