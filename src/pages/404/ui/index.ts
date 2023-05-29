import { Path } from '@shared/config';
import { Component, router } from '@shared/lib';
import { Error } from '@widgets/error';

@router.use(Path.CLIENT_ERROR)
export class ClientErrorPage extends Component {
  constructor() {
    super('div');
  }

  public render(): DocumentFragment {
    const error = new Error({ errorCode: 404, errorMessage: 'Не туда попали' });
    return error.render();
  }
}
