import { type Options, Methods, type RequestResult } from './types';
import { errorResponse, parseXHRResult } from './xhr-parsers';

import { API_URL } from '../config';
import { isQueryStingData } from '../lib';
import { queryStringify } from '../lib/api-helpers';

type HTTPMethod = (url: string, options?: Partial<Options>) => Promise<RequestResult>;

export class HTTPTransport {
  constructor(private readonly baseUrl: string) {
  }

  public request(
    url: string,
    options: Options,
    timeout = 5000,
  ) {
    const {
      method,
      data,
      headers,
    } = options;
    return new Promise<RequestResult>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, this.baseUrl + url, true);
      xhr.timeout = timeout;
      xhr.withCredentials = true;
      if (headers) {
        for (const [key, value] of Object.entries(headers)) {
          xhr.setRequestHeader(key, value);
        }
      }
      const isJSON = (!headers || !Object.keys(headers)
        .find((h) => h.toLowerCase() === 'content-type')) && !(data instanceof FormData);
      if (isJSON) {
        xhr.setRequestHeader('content-type', 'application/json');
      }

      xhr.onload = () => {
        resolve(parseXHRResult(xhr));
      };

      xhr.onabort = () => {
        reject(new Error('Request aborted'));
      };

      xhr.onerror = () => {
        reject(errorResponse(xhr, 'Request filed.'));
      };

      xhr.ontimeout = () => {
        reject(new Error('Request timed out'));
      };

      if (method === Methods.GET || !data) {
        xhr.send();
      } else {
        const sendData = data instanceof FormData ? data : JSON.stringify(data);
        xhr.send(sendData);
      }
    });
  }

  public get: HTTPMethod = (url, options = {}) => {
    const {
      data = {},
      ...otherOptions
    } = options;
    if (!isQueryStingData(data)) {
      throw new Error('Incorrect data in get request');
    }

    const queryString = queryStringify(data);
    const endpoint = `${url}?${queryString}`;
    return this.request(endpoint, {
      ...otherOptions,
      method: Methods.GET,
    }, options.timeout);
  };

  public post: HTTPMethod = (url, options = {}) => this.request(url, {
    ...options,
    method: Methods.POST,
  }, options?.timeout);

  public put: HTTPMethod = (url, options = {}) => this.request(url, {
    ...options,
    method: Methods.PUT,
  }, options.timeout);

  public delete: HTTPMethod = (url, options = {}) => this.request(url, {
    ...options,
    method: Methods.DELETE,
  }, options.timeout);
}

export const apiInstance = new HTTPTransport(API_URL);
