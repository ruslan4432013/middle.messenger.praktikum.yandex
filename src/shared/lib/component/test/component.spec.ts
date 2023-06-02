import { Component } from '..';
import { JSDOM } from 'jsdom';
import { expect } from 'chai';
import crypto from 'crypto';

const dom = new JSDOM('<!DOCTYPE html><html><body><div id="root"></div></body></html>', { url: 'http://localhost' });

if (!('crypto' in globalThis)) {
  Object.defineProperty(globalThis, 'crypto', {
    value: {
      getRandomValues: (arr: any[]) => crypto.randomBytes(arr.length)
    }
  });
}

if (!('document' in globalThis)) {
  Object.defineProperty(globalThis, 'document', {
    value: dom.window.document
  });
}

if (!('window' in globalThis)) {
  Object.defineProperty(globalThis, 'window', {
    value: dom.window
  });
}

class TestFirstComponent extends Component {
  constructor() {
    super('div');
  }

  render() {
    return this.compile(() => '<div data-test="test-component"></div>', this.props);
  }
}

describe('Проверяем компонент', function () {
  let document: Document;
  let root: HTMLElement;
  let testComponent: Component;

  const getTestComponent = () => document.querySelector('[data-test="test-component"]');

  beforeEach(() => {
    document = dom.window.document;
    root = document.querySelector('#root')!;
    testComponent = new TestFirstComponent();
    root.appendChild(testComponent.getContent());
  });

  afterEach(() => {
    root.innerHTML = '';
  });

  it('Компонент рендерится в DOM - дереве', () => {
    const componentInDom = getTestComponent();
    expect(componentInDom).not.undefined;
  });
  it('Проверка работы setProps', () => {
    testComponent.setProps({
      attr: {
        class: 'red',
        id: 'tested'
      }
    });
    const componentInDom = document.querySelector('#tested');
    expect(componentInDom).not.undefined;
    expect(componentInDom?.className)
      .to
      .equal('red');
  });

  it('Проверяем, что компонент удаляется из DOM дерева', () => {
    testComponent.hide();
    expect(getTestComponent()).null;
  });

  it('Проверяем, что навешиваются события и отрабатывают', () => {
    testComponent.setProps({
      events: {
        click: () => {
          testComponent.setProps({
            attr: {
              'data-click': 'clicked',
            }
          });
        }
      }
    });
    const event = new dom.window.Event('click', { bubbles: true });
    testComponent.getContent()
      .dispatchEvent(event);
    expect(document.querySelector('[data-click="clicked"]')).not.undefined;
  });
});
