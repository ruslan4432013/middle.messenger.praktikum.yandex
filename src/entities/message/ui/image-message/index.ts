import render from './image-message.hbs';
import s from './image-message.module.scss';

export type ImageMessageProps = {
  variant: 'image';
  src: string;
};

export const ImageMessage = (props: ImageMessageProps) => {
  const source = { ...s, ...props };
  return render(source);
};
