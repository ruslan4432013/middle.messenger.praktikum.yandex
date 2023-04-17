import sendIcon from './send-icon.svg';
import render from './send-message-input.hbs';
import s from './send-message-input.module.scss';

export const SendMessageInput = () => {
  const context = { sendIcon, name: 'message' };
  const source = { ...s, ...context };
  return render(source);
};
