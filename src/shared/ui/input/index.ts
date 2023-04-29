import { Component, type PropType } from '../../lib';

export type InputProps = {
  className?: string
} & PropType;
export class Input extends Component<InputProps> {
  constructor(props: InputProps) {
    super('input', props);
  }

  public render(): DocumentFragment {
    return this.compile(() => '', this.props);
  }
}
