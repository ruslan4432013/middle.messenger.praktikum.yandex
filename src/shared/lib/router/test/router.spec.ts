import { JSDOM } from 'jsdom';
import { Router } from '../router';
import { Component } from '@shared/lib';
import { expect } from 'chai';
import crypto from 'crypto';

const dom = new JSDOM('<!DOCTYPE html><html><body><div id="root"></div></body></html>', { url: 'http://localhost' });

if (!('document' in globalThis)) {
  Object.defineProperty(globalThis, 'document', {
    value: dom.window.document
  });
}

if (!('crypto' in globalThis)) {
  Object.defineProperty(globalThis, 'crypto', {
    value: {
      getRandomValues: (arr: any[]) => crypto.randomBytes(arr.length)
    }
  });
}

if (!('window' in globalThis)) {
  Object.defineProperty(globalThis, 'window', {
    value: dom.window
  });
}

class TestComponent extends Component {
  render(): string {
    return '<div>test</div>';
  }
}

class ErrorComponent extends Component {
  render(): string {
    return '<div>error</div>';
  }
}

describe('Проверяем переходы у Роута', function () {
  let router: Router;
  before(() => {
    router = new Router('#root');
    router.use('/test')(TestComponent);
    router.use('/404')(ErrorComponent);
    router.start();
  });

  it('Корректный переход на страницу test', () => {
    router.go('/test');
    const currentRoute = router.getRoute('/test');
    expect(currentRoute).not.undefined;
    expect(currentRoute?._pathname)
      .to
      .equal('/test');
  });

  it('Проверка, что неверный путь отсутствует', () => {
    const testRoute = router.getRoute('/test-1');
    expect(testRoute).undefined;
  });

  it('Проверка, при переходе на не существующий путь, будет переход на страницу 404', () => {
    router.go('/unknown-path');
    const currenPath = router._currentRoute?._pathname;
    expect(currenPath)
      .to
      .equal('/404');
  });
});
