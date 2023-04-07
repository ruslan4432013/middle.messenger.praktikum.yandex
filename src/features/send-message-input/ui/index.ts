import s from './send-message-input.module.scss'
import render from './send-message-input.hbs'
import sendIcon from './send-icon.svg'

export const SendMessageInput = () => {
  const context = { sendIcon }
  const source = { ...s, ...context }
  return render(source)
}
