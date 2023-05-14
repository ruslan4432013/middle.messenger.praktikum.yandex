import { type Path } from '../../config';
import { Component } from '../../lib';
import { Router } from '../../lib/router';

export type LinkProps = {
  to: Path;
  text: string;
  className?: string;
  onClick?: (event: Event) => void;
} & PropType;

export class Link extends Component<LinkProps> {
  constructor(props: LinkProps) {
    super('a', props);
  }

  protected getAdditionalProps(clearProps: LinkProps): Partial<LinkProps> {
    const {
      className,
      to,
      onClick,
    } = clearProps;
    return {
      attr: {
        href: to,
        class: className || '',
      },
      events: {
        click: (evt) => {
          evt.preventDefault();
          if (onClick) {
            onClick(evt);
          } else {
            new Router().go(to);
          }
        },
      },
    };
  }

  public render(): DocumentFragment {
    const { text } = this.props;
    return this.compile(() => text, this.props);
  }
}
