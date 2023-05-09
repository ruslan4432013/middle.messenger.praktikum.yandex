import { render } from './render';

import { type BaseView, type Component } from '..';

type RouteProp = {
  rootQuery: string
};

export class Route<P extends RouteProp = RouteProp> {
  private _pathname: string;

  private readonly _blockClass: new () => BaseView | Component;

  private _block: null | BaseView | Component;

  private _props: P;

  constructor(pathname: string, view: new () => BaseView | Component, props: P) {
    this._pathname = pathname;
    this._blockClass = view;
    this._props = props;
    this._block = null;
  }

  public match(pathname: string): boolean {
    return this._pathname === pathname;
  }

  public navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  public leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  public render() {
    this._block = new this._blockClass();
    render(this._props.rootQuery, this._block);
  }
}
