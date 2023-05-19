import {
  type ChildrenProps, type GetChildrenReturn, type PropWithoutChildren,
} from './types';

import { EventBus } from '../event-bus';
import { merge, uuid4 } from '../utils';

type Tags = keyof HTMLElementTagNameMap;
type Meta<Tag> = {
  tagName: Tag,
};

export abstract class Component<Props extends PropType = PropType, K extends Tags = Tags> {
  private static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  public eventBus: () => EventBus;

  private _element: HTMLElementTagNameMap[K] | null = null;

  public readonly props: PropWithoutChildren<Props>;

  private _meta: Meta<K>;

  protected children: ChildrenProps<Props>;

  private _isNeedUpdate = false;

  public readonly _id = uuid4();

  constructor(tagName: K, propsAndChildren: Props = {} as Props) {
    const additionalProps = this.getAdditionalProps?.(propsAndChildren);
    const {
      children,
      props,
    } = this._getChildren(
      this._mergeProps(propsAndChildren, additionalProps) as Props,
    ) as GetChildrenReturn<Props>;

    const eventBus = new EventBus();
    this._meta = {
      tagName,
    };

    this.children = this._makePropsProxy(children);
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Component.EVENTS.INIT);
  }

  private _mergeProps(currentProps: Props, additional?: Partial<PropType>) {
    if (!additional) {
      return currentProps;
    }

    return merge(currentProps, additional);
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement<K>(tagName);
  }

  private _addAttribute() {
    const { attr = {} } = this.props;
    Object.entries(attr)
      .forEach(([keyAttr, attribute]) => {
        this._element?.setAttribute(keyAttr, attribute);
      });
  }

  private _addEvents() {
    const { events } = this.props;
    if (!events) return;
    for (const [key, evt] of Object.entries(events)) {
      this._element?.addEventListener(key, evt);
    }
  }

  private _removeEvents() {
    const { events } = this.props;
    if (!events) return;
    for (const [key, evt] of Object.entries(events)) {
      this._element?.removeEventListener(key, evt);
    }
  }

  public init(props: typeof this.props) {
    this._createResources();
    this.eventBus()
      .emit(Component.EVENTS.FLOW_RENDER, props);
  }

  private _componentDidMount() {
    this.componentDidMount?.();
    Object.values(this.children)
      .forEach((child: Component | Component[]) => {
        if (this._isChildArray(child)) {
          child.forEach((el) => el.dispatchComponentDidMount());
        } else {
          child.dispatchComponentDidMount();
        }
      });
  }

  // Может переопределять пользователь, необязательно трогать
  public componentDidMount?(): void;

  public dispatchComponentDidMount() {
    this.eventBus()
      .emit(Component.EVENTS.FLOW_CDM);
    if (Object.keys(this.children).length) {
      this.eventBus()
        .emit(Component.EVENTS.FLOW_RENDER);
    }
  }

  public componentWillUnmount?(): void;

  private _componentDidUpdate(oldProps: Props, newProps: Props) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (response) {
      this._render();
    }
  }

  protected getAdditionalProps?(props: Props): PropType;

  // Может переопределять пользователь, необязательно трогать
  protected componentDidUpdate(oldProps: Props, newProps: Props): boolean;
  protected componentDidUpdate(): boolean {
    return true;
  }

  public setProps = <P extends Props>(nextProps: Partial<P>) => {
    if (!nextProps) {
      return;
    }

    this._isNeedUpdate = false;
    const oldValues = { ...this.props };

    const {
      children,
      props,
    } = this._getChildren(nextProps) as GetChildrenReturn<Props>;
    if (Object.values(children).length) {
      Object.assign(this.children, children);
    }

    if (Object.values(props).length) {
      Object.assign(this.props, props);
    }

    if (this._isNeedUpdate) {
      this.eventBus()
        .emit(Component.EVENTS.FLOW_CDU, oldValues, this.props);
      this._isNeedUpdate = false;
    }
  };

  get element() {
    return this._element;
  }

  private _render() {
    const block = this.render();
    this._removeEvents();
    if (!this._element) {
      throw new Error(`Element in ${this.constructor.name} is not defined`);
    }

    this._element.innerHTML = '';
    this._addEvents();
    this._addAttribute();
    this._element.appendChild(block);
  }

  public render(): DocumentFragment {
    throw new Error('Method Render not implemented');
  }

  private _getChildren(propsAndChildren: Partial<Props>) {
    const children: Record<string, Component | Component[]> = {};
    const props: Record<string, unknown> = {};

    Object.entries(propsAndChildren)
      .forEach(([key, value]) => {
        if (this._isComponent(value) || this._isChildArray(value)) {
          children[key] = value;
        } else {
          props[key] = value;
        }
      });

    return {
      children,
      props,
    };
  }

  public getContent() {
    const el = this.element;

    if (!el) {
      throw new Error('Element is not defined');
    }
    return el;
  }

  private _makePropsProxy<P extends Record<string, unknown> = {}>(props: P) {
    const self = this;

    return new Proxy(props, {
      get(target, property: string) {
        const value = target[property];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, property, value, receiver) {
        if (Reflect.get(target, property, receiver) !== value) {
          Reflect.set(target, property, value, receiver);
          self._isNeedUpdate = true;
        }

        return true;
      },
      deleteProperty() {
        throw new Error('No access');
      },
    });
  }

  private _createDocumentElement<T extends Tags>(tagName: T) {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }

  protected compile(render: (param?: unknown) => string, props: Props): DocumentFragment {
    const propsAndStubs: Record<string, unknown> = { ...props };

    (Object.entries(this.children) as [string, (Component | Component[])][])
      .forEach(([key, childEl]) => {
        if (this._isChildArray(childEl)) {
          propsAndStubs[key] = childEl.map((child) => (
            `<div data-id="${child._id}"></div>`
          ));
        } else {
          propsAndStubs[key] = `<div data-id="${childEl._id}"></div>`;
        }
      });

    const fragment = this._createDocumentElement('template');

    fragment.innerHTML = render(propsAndStubs);

    Object.values(this.children)
      .forEach((child: Component | Component[]) => {
        if (Array.isArray(child)) {
          child.forEach((el) => {
            const stub = fragment.content.querySelector(`[data-id="${el._id}"]`);
            stub?.replaceWith(el.getContent());
          });
        } else {
          const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
          stub?.replaceWith(child.getContent());
        }
      });

    return fragment.content;
  }

  public show() {
    const content = this.getContent();
    content.style.display = 'block';
  }

  public hide() {
    const content = this.getContent();
    content.remove();
  }

  private _isChildArray(val: unknown): val is Component[] {
    return (
      Array.isArray(val)
      && val.filter((el) => el instanceof Component).length === val.length);
  }

  private _isComponent(value: unknown): value is Component {
    return value instanceof Component;
  }
}
