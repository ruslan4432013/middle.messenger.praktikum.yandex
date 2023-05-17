import { cn, Component } from '@shared/lib';
import { Link, type LinkProps } from '@shared/ui/link';

import render from './auth-form.hbs';
import s from './auth-form.module.scss';

type Props = {
  fields: Component[];
  titleText: string;
  Button: Component;
  linkProps: LinkProps;
  minHeight?: string;
} & PropType;

export class AuthForm extends Component<Props> {
  constructor(props: Props) {
    super('main', props);
  }

  protected getAdditionalProps(clearProps: Props): Partial<Props> {
    const {
      linkProps: {
        to,
        text,
        className,
        ...other
      },
    } = clearProps;
    const props = {
      ...s,
      Link: new Link({
        className: cn(s.link, className),
        to,
        text,
        ...other,
      }),
    };
    return props;
  }

  public render(): DocumentFragment {
    return this.compile(render, this.props);
  }
}
