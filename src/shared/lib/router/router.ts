import { Route } from './route';

import { type BaseView, type Component } from '..';
import { Path, ROOT_SELECTOR } from '../../config';
import { isCorrectPopStateEvent } from '../type-guards';

export class Router {
  public static __instance: Router | null;

  private _routes: Route[];

  public _history: History;

  public _currentRoute: null | Route;

  private readonly _rootQuery: string;

  public _routeWindow: Window | null;

  constructor(rootQuery?: string, routeWindow?: Window) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this._routes = [];
    this._routeWindow = routeWindow || null;
    this._history = (routeWindow || window).history;
    this._currentRoute = null;
    if (!rootQuery) throw new Error('Root query not implemented');
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  public use(pathname: Path | string) {
    const self = this;
    return function <T extends new (...args: any[]) => (Component | BaseView)>(constructor: T) {
      const route = new Route(pathname, constructor, { rootQuery: self._rootQuery });
      self._routes.push(route);
      return constructor;
    };
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      if (this._routes.length === 0) return;
      this._onRoute(Path.CLIENT_ERROR);
      return;
    }
    if (this._currentRoute) {
      this._currentRoute.leave();
    }
    this._currentRoute = route;
    route.render();
  }

  public useParams<T extends Record<string, string> = Record<string, string>>(): T {
    return this._currentRoute?.getParams<T>() || {} as T;
  }

  public start() {
    (this._routeWindow || window).onpopstate = (event: PopStateEvent) => {
      if (isCorrectPopStateEvent(event)) {
        this._onRoute(event.currentTarget.location.pathname);
      }
    };

    this._onRoute((this._routeWindow || window).location.pathname);
  }

  public go(pathname: string) {
    this._history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  public back() {
    this._history.back();
  }

  public getRoute(pathname: string) {
    return this._routes.find((r) => r.match(pathname));
  }
}

const getRouter = () => {
  if (typeof window !== 'undefined') {
    return new Router(ROOT_SELECTOR);
  }
  return null;
};

export const router = getRouter()!;
