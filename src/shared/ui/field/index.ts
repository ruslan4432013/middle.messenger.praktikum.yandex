import { Component, type PropType } from '@shared/lib';
import { isTargetWithValue } from '@shared/lib/type-helpers';

export type FieldProps = {
  onChange?: (value: string) => void;
  value?: string;
  onFocus?: (ev: FocusEvent) => void;
  onBlur?: (ev: FocusEvent) => void;
  validationFn?: (value: string) => boolean;
  errorMessage?: string;
  invalid?: boolean;
  name: string;
} & PropType;

export abstract class Field<Props extends FieldProps = FieldProps> extends Component<Props> {
  public value: string = this.props.value || '';

  constructor(props: Props) {
    super('div', props);
    this._addFocusEvents();
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

  private _addFocusEvents() {
    if (!this.element) return;
    const input = this.element.querySelector('input');
    if (!input) {
      throw new Error('No inputs in fields');
    }
    input.addEventListener('focus', (evt) => {
      this.props.onFocus?.(evt);
      this.validate();
    });
    input.addEventListener('blur', (evt) => {
      this.props.onBlur?.(evt);
      this.validate();
    });
  }

  protected getAdditionalProps(): Partial<Props> {
    return {
      events: {
        input: (evt) => {
          if (isTargetWithValue(evt.target)) {
            this.value = evt.target.value;
            this.props.onChange?.(evt.target.value);
          }
        },
      },
    } as Partial<Props>;
  }
}
