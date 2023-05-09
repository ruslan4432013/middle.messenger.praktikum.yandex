import render from './action-field.hbs';
import s from './action-field.module.scss';

import { type Path } from '../../config';
import { cn, Component, type PropType } from '../../lib';
import { Link } from '../link';

type Props = {
  label: string;
  color: 'error' | 'primary';
  path: Path
} & PropType;

export class ActionField extends Component<Props> {
  constructor(props: Props) {
    super('div', props);
  }

  protected getAdditionalProps(clearProps: Props) {
    const { color, path, label } = clearProps;
    const styles = {
      ...s,
    };
    return {
      ...styles,
      Link: new Link({
        to: path,
        text: label,
        className: cn(s.label_text, {
          [s.primary]: color === 'primary',
          [s.error]: color === 'error',
        }),
      }),
      attr: {
        class: s.field_wrapper,
      },
    };
  }

  public render(): DocumentFragment {
    return this.compile(render, this.props);
  }
}
