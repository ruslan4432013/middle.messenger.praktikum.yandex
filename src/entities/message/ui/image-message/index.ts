import * as s from './image-message.module.scss'
import render from './image-message.hbs'

export type ImageMessageProps = {
  variant: 'image';
  src: string;
}

export const ImageMessage = (props: ImageMessageProps) => {
  const source = { ...s, ...props }
  return render(source)
}
