import { EventBus } from '../event-bus';

type Tags = keyof HTMLElementTagNameMap;
type Meta<Props> = {
  tagName: Tags,
  props: Props
};

export abstract class Component<Props extends Record<string, any>> {
  private static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  private eventBus: () => EventBus;

  private _element: HTMLElement | null = null;

  private props: Props;

  private _meta: Meta<Props>;

  constructor(tagName: Tags = 'div', props: Props = {} as Props) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Component.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  public init() {
    this._createResources();
    this.eventBus()
      .emit(Component.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount?.();
    this.dispatchComponentDidMount();
  }

  // Может переопределять пользователь, необязательно трогать
  protected componentDidMount?(oldProps?: Props): string;

  public dispatchComponentDidMount() {
    this.eventBus()
      .emit(Component.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate?.(oldProps, newProps);
    if (response) {
      this._render();
    }
  }

  // Может переопределять пользователь, необязательно трогать
  protected componentDidUpdate?(oldProps: Props, newProps: Props): boolean;

  public setProps = (nextProps: Partial<Props>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  private _render() {
    const block = this.render();
    if (!this._element) {
      throw new Error(`Element in ${this.constructor.name} is not defined`);
    }
    this._element.innerHTML = block;
  }

  protected abstract render(): string;

  public getContent() {
    return this.element;
  }

  private _makePropsProxy(props: Props) {
    const self = this;

    return new Proxy<Props>(props, {
      get(target, property: string) {
        const value = target[property];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, property, value) {
        Reflect.set(target, property, value);
        self.eventBus()
          .emit(Component.EVENTS.FLOW_CDU, self.props, target);
        return true;
      },
      deleteProperty() {
        throw new Error('No access');
      },
    });
  }

  private _createDocumentElement(tagName: Tags): HTMLElement {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  public show() {
    const content = this.getContent();
    if (content) {
      content.style.display = 'block';
    }
  }

  public hide() {
    const content = this.getContent();
    if (content) {
      content.style.display = 'none';
    }
  }
}
