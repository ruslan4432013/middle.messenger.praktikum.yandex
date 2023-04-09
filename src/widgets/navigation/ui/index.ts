import s from './navigation.module.scss'
import render from './navigation.hbs'
import { Button } from '@shared/ui/button'

type Props = {
  pages: Record<string, () => string>
}
export const Navigation = ({ pages }: Props) => {
  const container = document.querySelector('#root')!
  const buttons: string[] = Object.entries(pages).map(([page, fn]) => Button({
    text: page,
    onClick: () => container.innerHTML = fn(),
  }))

  const ButtonHide = Button({
    text: 'Скрыть',
    onClick: (evt) => {
      const buttonsBlock = document.querySelector(`.${s.navigation_buttons}`)!
      buttonsBlock.classList.toggle(s.hide)
      if (evt.target && 'innerText' in evt.target) {
        evt.target.innerText = evt.target.innerText === 'Скрыть' ? 'Показать' : 'Скрыть'
      }

    }
  })


  const source = { ...s, buttons, ButtonHide }
  return render(source)
}
