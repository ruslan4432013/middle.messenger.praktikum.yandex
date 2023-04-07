import { Error } from '@widgets/error'

export const ClientErrorPage = () => {
  return Error({errorCode: 404, errorMessage: 'Не туда попали'})
}
