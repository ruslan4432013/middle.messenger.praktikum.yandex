import { Error } from '@widgets/error';

export const ClientErrorPage = () => Error({ errorCode: 404, errorMessage: 'Не туда попали' });
