import { Component } from '@shared/lib';
import { Error } from '@widgets/error';

export class ClientErrorPage extends Component {
  constructor() {
    super('div');
  }

  public render(): DocumentFragment {
    const error = new Error({ errorCode: 404, errorMessage: 'Не туда попали' });
    return error.render();
  }
}
