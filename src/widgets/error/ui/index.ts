import * as s from './error.module.scss'
import render from './error.hbs'

type Props = {
  errorCode: number;
  errorMessage: string;
}
export const Error = (props: Props) => {
  const source = { ...s, ...props }
  return render(source)
}
