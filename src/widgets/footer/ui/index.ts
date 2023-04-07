import { SendMessageInput } from '@features/send-message-input'
import { AttachToChat } from '@features/attach-to-chat'

import render from './footer.hbs'
import * as s from './footer.module.scss'


export const Footer = () => {
  const components = {
    SendMessageInput: SendMessageInput(),
    AttachToChat: AttachToChat(),
  }
  const source = { ...s, ...components }
  return render(source)
}
