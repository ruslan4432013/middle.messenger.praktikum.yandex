import { Path } from '@shared/config';
import { Component } from '@shared/lib';
import { ActionField } from '@shared/ui/action-field';

export class ChangeProfile extends Component {
  constructor() {
    super('div');
  }

  public render(): DocumentFragment {
    const component = new ActionField({
      label: 'Изменить данные',
      color: 'primary',
      path: Path.USER_SETTINGS,
    });
    return component.render();
  }
}
