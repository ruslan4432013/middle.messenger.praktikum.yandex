import render from './attach-to-chat.hbs';
import attachIcon from './attach-icon.svg';
import s from './attach-to-chat.module.scss';

export const AttachToChat = () => {
  const context = { attachIcon };
  const source = { ...context, ...s };
  return render(source);
};
