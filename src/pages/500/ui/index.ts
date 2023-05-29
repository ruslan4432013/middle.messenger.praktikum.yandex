import { Path } from '@shared/config';
import { Component, router } from '@shared/lib';
import { Error } from '@widgets/error';

@router.use(Path.SERVER_ERROR)
export class ServerErrorPage extends Component {
  constructor() {
    super('div');
  }

  public render(): DocumentFragment {
    const error = new Error({ errorCode: 500, errorMessage: 'Мы уже фиксим' });
    return error.render();
  }
}
