import render from './content.hbs';
import s from './styles.module.scss';

import { Component } from '../../lib';
import { type AuthField } from '../auth-field';
import { Button } from '../button';

type ModalProps = {
  title: string;
  fields: AuthField[];
  buttonText: string;
  onClick?: (evt: Event) => void
  children?: Component
} & PropType;
export class ModalContent extends Component<ModalProps> {
  constructor(props: ModalProps) {
    const button = new Button({
      text: props.buttonText,
      onClick: props.onClick,
    });
    super('div', {
      ...props,
      ...s,
      Button: button,
      attr: {
        class: s.content,
      },
    });
  }

  public render(): DocumentFragment {
    return this.compile(render, this.props);
  }
}
