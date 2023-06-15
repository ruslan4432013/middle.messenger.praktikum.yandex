import render from './dropdown.hbs';
import chatActionsIcon from './dropdown_icon.svg';
import { Overlay } from './overlay';
import s from './styles.module.scss';

import { cn, Component } from '../../lib';
import { IconButton } from '../icon-button';

type ActionProps = {
  actions: Component[]
  classNamePosition: string
} & PropType;

export class ActionsDropdown extends Component<ActionProps> {
  private _isOpen = false;

  constructor(prop: ActionProps) {
    super('div', prop);
  }

  protected getAdditionalProps(clearProps:ActionProps) {
    const self = this;
    const overlay = new Overlay({
      onClick() {
        const dropdownMenuStyle = cn(
          s.dropdown_menu,
          s.dropdown_menu__hide,
          clearProps.classNamePosition,
        );
        self._isOpen = false;
        self.setProps({
          dropdown_menu: dropdownMenuStyle,
        });
        overlay.hide();
      },
    });

    const button = new IconButton({
      src: chatActionsIcon,
      onClick() {
        self._isOpen = !self._isOpen;
        const dropdownMenuStyle = cn(s.dropdown_menu, clearProps.classNamePosition, {
          [s.dropdown_menu__show]: self._isOpen,
          [s.dropdown_menu__hide]: !self._isOpen,
        });
        self.setProps({
          dropdown_menu: dropdownMenuStyle,
          OverlayComponent: overlay,
        });
      },
    });

    return {
      attr: {
        class: s.dropdown,
      },
      Button: button,
      ...s,
    };
  }

  public render(): DocumentFragment {
    return this.compile(render, this.props);
  }
}
