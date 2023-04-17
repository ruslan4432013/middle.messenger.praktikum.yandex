import render from './image-message.hbs';

export type ImageMessageProps = {
  variant: 'image';
  src: string;
};

export const ImageMessage = (props: ImageMessageProps) => {
  const source = { ...props };
  return render(source);
};
