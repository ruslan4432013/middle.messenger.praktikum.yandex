import { Path } from '@shared/config';
import { Component } from '@shared/lib';
import { ActionField } from '@shared/ui/action-field';

export class ChangePassword extends Component {
  constructor() {
    super('div');
  }

  public render(): DocumentFragment {
    const component = new ActionField({
      label: 'Изменить пароль',
      color: 'primary',
      path: Path.CHANGE_PASSWORD,
    });
    return component.render();
  }
}
