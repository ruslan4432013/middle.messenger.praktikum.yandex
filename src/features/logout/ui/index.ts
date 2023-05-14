import { sessionApi } from '@entities/session';
import { Path } from '@shared/config';
import { Component, router, store } from '@shared/lib';
import { ActionField } from '@shared/ui/action-field';

export class Logout extends Component {
  constructor() {
    super('div');
  }

  public render(): DocumentFragment {
    const component = new ActionField({
      label: 'Выйти',
      color: 'error',
      path: Path.LOGIN,
      onClick() {
        sessionApi.logout().then(() => {
          store.set('user', {});
          router.go(Path.LOGIN);
        });
      },
    });
    return component.render();
  }
}
