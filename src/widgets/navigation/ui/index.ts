import { Component } from '@shared/lib/component';
import { Button } from '@shared/ui/button';

import render from './navigation.hbs';
import s from './navigation.module.scss';

type Props = {
  pages: Record<string, () => string>
};

export class Navigation extends Component<Props> {
  constructor(props: Props) {
    const { pages } = props;
    const container = document.querySelector('#root')!;
    const buttons = Object.entries(pages)
      .map(([page, fn]) => new Button({
        text: page,
        events: {
          click: () => {
            console.log('clicked');
            container.innerHTML = fn();
          },
        },
      }));
    const source = {
      buttons,
      ...s,
    };
    Object.assign(props, source);
    super('div', props);
  }

  protected render(): DocumentFragment {
    return this.compile(render, this.props);
  }
}
