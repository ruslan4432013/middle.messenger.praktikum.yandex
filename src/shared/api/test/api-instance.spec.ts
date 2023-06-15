import { HTTPTransport } from '../base';
import { JSDOM } from 'jsdom';
import { expect } from 'chai';

const dom = new JSDOM('<!DOCTYPE html><html><body><div id="root"></div></body></html>', { url: 'http://localhost' });

Object.defineProperty(globalThis, 'XMLHttpRequest', {
  value: dom.window.XMLHttpRequest
});

if (!('FormData' in globalThis)) {
  Object.defineProperty(globalThis, 'FormData', {
    value: dom.window.FormData
  });
}

type PostResponse = {
  id: number,
  title: string,
  body: string,
  userId: number
}

describe('Проверка HTTP клиента', () => {
  let apiInstance: HTTPTransport;
  before(() => {
    apiInstance = new HTTPTransport('https://jsonplaceholder.typicode.com');
  });
  it('Проверяем корректность get-запроса', async () => {
    const res = await apiInstance.get('/posts/1');
    expect(res.ok).true;
    if (!res.ok) {
      return;
    }
    expect(res.json<{ id: number }>().id)
      .to
      .equal(1);
  });

  it('Проверяем корректность post-запроса', async () => {
    const res = await apiInstance.post('/posts', {
      data: {
        title: 'foo',
        body: 'bar',
        userId: 1,
      }
    });
    expect(res.ok).true;
    if (!res.ok) {
      return;
    }
    expect(res.json<PostResponse>().title)
      .to
      .equal('foo');
  });
  it('Проверяем корректность put-запроса', async () => {
    const res = await apiInstance.put('/posts/1', {
      data: {
        id: 1,
        title: 'foo',
        body: 'bar',
        userId: 1,
      }
    });
    expect(res.ok).true;
    if (!res.ok) {
      return;
    }
    expect(res.json<PostResponse>().title)
      .to
      .equal('foo');
  });
  it('Проверяем корректность delete-запроса', async () => {
    const res = await apiInstance.delete('/posts/1');
    expect(res.status)
      .to
      .equal(200);
    expect(res.ok).true;
  });
});
