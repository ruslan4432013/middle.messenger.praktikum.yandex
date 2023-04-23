import { type PropType, type BaseView } from '@shared/lib';
import { Component } from '@shared/lib/component';
import { Button } from '@shared/ui/button';

import render from './navigation.hbs';
import s from './navigation.module.scss';

type Props = {
  pages: Record<string, () => Component | BaseView>
} & PropType;

export class Navigation extends Component<Props> {
  constructor(props: Props) {
    super('div', props);
  }

  protected getAdditionalProps(clearProps: Props): Partial<Props> {
    const { pages } = clearProps;
    const container = document.querySelector('#root')!;
    const buttons = Object.entries(pages)
      .map(([page, fn]) => new Button({
        text: page,
        events: {
          click: () => {
            container.innerHTML = '';
            const res = fn();
            if (res instanceof Component) {
              container.appendChild(res.getContent());
            } else {
              res.mount();
            }
          },
        },
      }));
    return {
      HideButton: new Button({
        text: 'Скрыть / Показать',
        events: {
          click: () => {
            document.querySelector(`.${s.navigation_buttons}`)?.classList.toggle(s.hide);
          },
        },
      }),
      buttons,
      ...s,
    };
  }

  public render(): DocumentFragment {
    return this.compile(render, this.props);
  }
}
