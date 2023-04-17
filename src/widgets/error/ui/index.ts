import render from './error.hbs';
import s from './error.module.scss';

type Props = {
  errorCode: number;
  errorMessage: string;
};
export const Error = (props: Props) => {
  const source = { ...s, ...props };
  return render(source);
};
