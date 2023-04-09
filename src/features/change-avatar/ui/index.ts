import s from './change-avatar.module.scss'
import render from './change-avatar.hbs'

export const ChangeAvatar = () => {
  const context = {
    src: 'https://via.placeholder.com/130x130',
    name: 'avatar',
    id: 'file-name'
  }
  const source = { ...s, ...context }
  return render(source)
}
