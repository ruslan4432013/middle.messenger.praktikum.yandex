import { Component, type PropType } from '@shared/lib';

import attachIcon from './attach-icon.svg';
import render from './attach-to-chat.hbs';
import s from './attach-to-chat.module.scss';

export class AttachToChat extends Component {
  constructor() {
    super('div');
  }

  protected getAdditionalProps(): Partial<PropType> {
    const context = { attachIcon };
    return { ...context, ...s };
  }

  public render(): DocumentFragment {
    return this.compile(render, this.props);
  }
}
