import { ChatList } from '@widgets/chat-list'
import { Header } from '@widgets/header'
import { Footer } from '@widgets/footer'
import { ChatMessages } from '@widgets/chat-messages'

import render from './home.hbs'
import * as s from './home.module.scss'


type Props = {
  chatUuid: null | string
}

export const HomePage = ({ chatUuid }: Props) => {
  const context = {
    chatUuid
  }
  const components = {
    ChatList: ChatList(),
    Header: Header(),
    Footer: Footer(),
    ChatMessages: ChatMessages()
  }


  const source = {
    ...components,
    ...context,
    ...s,
  }
  return render(source)
}
