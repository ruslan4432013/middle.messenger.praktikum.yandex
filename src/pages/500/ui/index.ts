import { Component } from '@shared/lib';
import { Error } from '@widgets/error';

export class ServerErrorPage extends Component {
  constructor() {
    super('div');
  }

  public render(): DocumentFragment {
    const error = new Error({ errorCode: 500, errorMessage: 'Мы уже фиксим' });
    return error.render();
  }
}
