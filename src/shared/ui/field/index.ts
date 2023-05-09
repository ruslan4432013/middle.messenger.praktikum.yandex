import { Component, type PropType, isEvtTargetWithValue } from '../../lib';
import { Input, type InputProps } from '../input';

export type FieldProps = {
  onChange?: (value: string) => void;
  value?: string;
  onFocus?: (ev: Event) => void;
  onBlur?: (ev: Event) => void;
  validationFn?: (value: string) => boolean;
  errorMessage?: string;
  invalid?: boolean;
  name: string;
  Input?: Component;
  inputProps?: InputProps;
} & PropType;

export abstract class Field<Props extends FieldProps = FieldProps> extends Component<Props> {
  public value: string = this.props.value || '';

  constructor(props: Props) {
    super('div', props);
  }

  public isValid(): boolean {
    const { validationFn } = this.props;
    if (!validationFn) return true;
    return validationFn(this.value);
  }

  public validate(): void {
    const { errorMessage } = this.props;
    const elem = this.getContent();
    if (!this.isValid()) {
      elem.classList.add('invalid');
      if (errorMessage) {
        elem.dataset.error = errorMessage;
      }
    } else {
      elem.classList.remove('invalid');
      delete elem.dataset.error;
    }
  }

  protected getAdditionalProps(clearProps: Props): Partial<Props> {
    const { inputProps = {} } = clearProps;
    return {
      Input: new Input({
        ...inputProps,
        events: {
          focus: (evt) => {
            this.props.onFocus?.(evt);
            this.validate();
          },
          blur: (evt) => {
            this.props.onBlur?.(evt);
            this.validate();
          },
        },
      }),
      events: {
        input: (evt) => {
          if (isEvtTargetWithValue(evt.target)) {
            this.value = evt.target.value;
            this.props.onChange?.(evt.target.value);
          }
        },
      },
    } as Partial<Props>;
  }
}
