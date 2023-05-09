import { type Path } from '../../config';
import { Component, type PropType } from '../../lib';
import { Router } from '../../lib/router';

export type LinkProps = {
  to: Path;
  text: string;
  className?: string;
} & PropType;

export class Link extends Component<LinkProps> {
  constructor(props: LinkProps) {
    super('a', props);
  }

  protected getAdditionalProps(clearProps: LinkProps): Partial<LinkProps> {
    const { className, to } = clearProps;
    return {
      attr: {
        href: to,
        class: className || '',
      },
      events: {
        click: (evt) => {
          evt.preventDefault();
          new Router().go(to);
        },
      },
    };
  }

  public render(): DocumentFragment {
    const { text } = this.props;
    return this.compile(() => text, this.props);
  }
}
