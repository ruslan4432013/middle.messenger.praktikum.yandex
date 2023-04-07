import { ImageMessage, type ImageMessageProps } from './image-message'
import { TextMessage, type TextMessageProps } from './text-message'

import * as s from './message.module.scss'
import render from './message.hbs'
import { getMessageTime } from '@shared/lib'

type PositionProps = {
  position: 'left' | 'right'
}

type ComplexProps = ImageMessageProps | TextMessageProps

type MessageProps = ComplexProps & PositionProps & {
  date: Date
}


export const Message = (props: MessageProps): string => {
  const { variant, position, date } = props

  let Body: string
  switch (variant) {
    case 'image':
      Body = ImageMessage(props)
      break
    case 'text':
      Body = TextMessage(props)
      break
    default:
      const unknownVariant: never = variant
      throw new Error(`Unknown message type: ${variant}`)
  }

  const { isoTime, messageTime } = getMessageTime(date)

  const styles = {
    ...s,
    ...(position === 'right' && {
      message_wrapper: `${s.message_wrapper} ${s.right_message} ${s.message_wrapper__owner}`,
      time_wrapper: `${s.time_wrapper} ${s.time_wrapper__owner}`,
      time_extra: `${s.time_extra} ${s.time_extra__owner}`,
    })
  }

  const context = {
    messageTime,
    isoTime
  }

  const components = {
    Body
  }


  const source = { ...styles, ...components, ...context }
  return render(source)
}
