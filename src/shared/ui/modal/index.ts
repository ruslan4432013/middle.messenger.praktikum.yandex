import render from './modal.hbs';
import s from './styles.module.scss';

import { cn, Component } from '../../lib';

type ModalProps = {
  Content: Component | string;
  modalClassName?: string;
  onOpen?: () => void
} & PropType;

export class Modal extends Component<ModalProps> {
  constructor(props: ModalProps) {
    super('div', props);
  }

  protected getAdditionalProps(): Partial<ModalProps> {
    return {
      events: {
        click: (evt) => {
          if (evt.target === this.getContent()) {
            this.hide();
          }
        },
      },
    };
  }

  public show() {
    document.body.append(this.getContent());
    this.props.onOpen?.();
    this.setProps({
      modal_class_name: cn(s.modal, s.open_modal),
      attr: {
        class: cn(s.overlay, s.open_overlay),
      },
    });
  }

  public hide() {
    this.setProps({
      modal_class_name: cn(s.modal, s.closed_modal),
      attr: {
        class: cn(s.overlay, s.closed_overlay),
      },
    });
    setTimeout(() => {
      super.hide();
    }, 200);
  }

  public render(): DocumentFragment {
    return this.compile(render, this.props);
  }
}
