import render from './text-message.hbs'
import * as s from './text-message.module.scss'

export type TextMessageProps = {
  variant: 'text'
  text: string;
}

export const TextMessage = (props: TextMessageProps) => {
  const source = { ...s, ...props }
  return render(source)
}
