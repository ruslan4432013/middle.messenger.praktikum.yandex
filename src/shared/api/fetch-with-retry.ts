import { apiInstance } from './base';
import { type Options, type RequestResult } from './types';

export const fetchWithRetry = (url: string, options: Options): Promise<RequestResult> => {
  const { retries = 2 } = options;

  function errorHandler() {
    const leftRetries = retries - 1;
    if (!leftRetries) {
      throw new Error('Service not available');
    }
    return fetchWithRetry(url, {
      ...options,
      retries: leftRetries,
    });
  }

  return apiInstance.request(url, options)
    .catch(errorHandler);
};
