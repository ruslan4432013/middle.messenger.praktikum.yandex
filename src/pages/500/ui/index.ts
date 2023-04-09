import { Error } from '@widgets/error'

export const ServerErrorPage = () => {
  return Error({errorCode: 500, errorMessage: 'Мы уже фиксим'})
}
