import * as s from './button.module.scss'
import { $ } from '@shared/lib'

type Props = {
  text: string;
  onClick?: EventListenerOrEventListenerObject
}

export const Button = (props: Props) => {
  const { text, onClick } = props
  const button = document.createElement('button')
  button.classList.add(s.auth_button)
  button.innerText = text
  if (onClick) {
    $(button).on('click', onClick)
  }
  return button.outerHTML
}
