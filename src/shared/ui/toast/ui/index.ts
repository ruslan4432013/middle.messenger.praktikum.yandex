import closeIcon from './close_icon.svg';
import errorIcon from './error_icon.svg';
import s from './styles.module.scss';
import successIcon from './success_icon.svg';
import render from './toast.hbs';

import { Component } from '../../../lib';
import { IconButton } from '../../icon-button';

type ToastProps = {
  message: string
  type: 'error' | 'success',
  onClick?: () => void
} & PropType;

class Toast extends Component<ToastProps> {
  constructor(props: ToastProps) {
    super('div', props);
  }

  protected getAdditionalProps({
    type,
    onClick,
  }: ToastProps): PropType {
    const CloseButton = new IconButton({
      src: closeIcon,
      attr: {
        class: s.button_close,
      },
      events: {
        click: () => {
          onClick?.();
        },
      },
    });
    return {
      ...s,
      CloseButton,
      iconPath: type === 'error' ? errorIcon : successIcon,
      attr: { class: s.toast },
      events: {
        click: onClick,
      },
    };
  }

  public render(): DocumentFragment {
    return this.compile(render, this.props);
  }
}

export const toast = {
  error(message: string) {
    const t = new Toast({
      message,
      type: 'error',
      onClick() {
        t.hide();
      },
    });
    document.body.appendChild(t.getContent());
    setTimeout(() => {
      t.hide();
    }, 4000);
  },
  success(message: string) {
    const t = new Toast({
      message,
      type: 'success',
      onClick() {
        t.hide();
      },
    });
    document.body.appendChild(t.getContent());
    setTimeout(() => {
      t.hide();
    }, 4000);
  },
};
