import render from './action-field.hbs'
import s from './action-field.module.scss'

type Props = {
  label: string;
  color: 'error' | 'primary'
}

export const ActionField = (props: Props) => {
  const { color } = props
  const textColor = color === 'primary' ? s.primary : s.error
  const styles = {
    ...s,
    label_text: `${s.label_text} ${textColor}`
  }
  const context = { ...props, ...styles }
  return render(context)
}
