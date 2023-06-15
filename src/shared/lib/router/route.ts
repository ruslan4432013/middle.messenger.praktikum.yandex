import { render } from './render';

import { type BaseView, type Component } from '..';

type ParsePathResult = {
  path: string,
  params: Record<string, string>,
  withParams: boolean,
};

type RouteProp = {
  rootQuery: string
  params?: Record<string, string>,
};

export class Route<P extends RouteProp = RouteProp> {
  public _pathname: string;

  private readonly _blockClass: new () => BaseView | Component;

  private _block: null | BaseView | Component;

  private _props: P;

  constructor(pathname: string, view: new () => BaseView | Component, props: P) {
    this._pathname = pathname;
    this._blockClass = view;
    this._props = props;
    if (!props.params) {
      this._props.params = {};
    }
    this._block = null;
  }

  public getParams<Params extends Record<string, string> = Record<string, string>>() {
    return this._props.params as Params;
  }

  public match(pathname: string): boolean {
    const { params, withParams } = this._parsePath(this._pathname, pathname);
    if (!withParams) {
      this._props.params = {};
      return pathname === this._pathname;
    }
    this._props.params = params;
    return true;
  }

  private _parsePath(pathname: string, currentPath: string): ParsePathResult {
    const lhsSplit = pathname.split('/');
    const currentPathSplit = currentPath.split('/');
    if (lhsSplit.length !== currentPathSplit.length) {
      return {
        path: currentPath,
        params: {},
        withParams: false,
      };
    }
    const params: Record<string, string> = {};
    let withParams = false;
    for (let i = 0; i < lhsSplit.length; i++) {
      if (lhsSplit[i].includes(':')) {
        params[lhsSplit[i].replace(':', '')] = currentPathSplit[i];
        withParams = true;
      }
    }
    if (!withParams) {
      return {
        path: currentPath,
        params: {},
        withParams: false,
      };
    }
    return {
      path: currentPath,
      params,
      withParams: true,
    };
  }

  public navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  public leave() {
    if (this._block) {
      this._block.componentWillUnmount?.();
      this._block.hide();
    }
  }

  public render() {
    this._block = new this._blockClass();
    render(this._props.rootQuery, this._block);
  }
}
