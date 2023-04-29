import { apiHelpers } from '@shared/lib';

import { type Options, Methods } from './types';

class HTTPTransport {
  public request<D extends Record<string, unknown> = Record<string, unknown>>(
    url: string,
    options: Options<D>,
    timeout = 5000,
  ): Promise<Response> {
    const {
      method,
      body,
      headers,
    } = options;
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      xhr.timeout = timeout;
      if (headers) {
        for (const [key, value] of Object.entries(headers)) {
          xhr.setRequestHeader(key, value);
        }
      }

      xhr.onload = () => {
        resolve(xhr.response);
      };

      xhr.onabort = () => {
        reject(new Error('Request aborted'));
      };

      xhr.onerror = () => {
        reject(new Error('Request failed'));
      };

      xhr.ontimeout = () => {
        reject(new Error('Request timed out'));
      };

      if (method === Methods.GET || !body) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(body));
      }
    });
  }

  public get<D extends Record<string, unknown>>(
    url: string,
    options: Partial<Options<D>> = {},
  ): Promise<Response> {
    const {
      data = {},
      ...otherOptions
    } = options;
    const queryString = apiHelpers.queryStringify(data);
    const endpoint = `${url}${queryString}`;
    return this.request(endpoint, {
      ...otherOptions,
      method: Methods.GET,
    }, options.timeout);
  }

  public post<D extends Record<string, unknown>>(
    url: string,
    options: Partial<Options<D>> = {},
  ): Promise<Response> {
    return this.request(url, {
      ...options,
      method: Methods.POST,
    }, options.timeout);
  }

  public put<D extends Record<string, unknown>>(
    url: string,
    options: Partial<Options<D>>,
  ): Promise<Response> {
    return this.request(url, {
      ...options,
      method: Methods.PUT,
    }, options.timeout);
  }

  public delete<D extends Record<string, unknown>>(
    url: string,
    options: Partial<Options<D>>,
  ): Promise<Response> {
    return this.request(url, {
      ...options,
      method: Methods.DELETE,
    }, options.timeout);
  }
}

export const apiInstance = new HTTPTransport();
