import { Error } from '@widgets/error';

export const ServerErrorPage = () => Error({ errorCode: 500, errorMessage: 'Мы уже фиксим' });
