import render from './find-message.hbs';
import s from './find-message.module.scss';

export const FindMessage = () => {
  const source = { ...s };
  return render(source);
};
