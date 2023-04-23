export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface Options<
  D extends Record<string, unknown> = Record<string, unknown>,
> extends RequestInit {
  method: Methods,
  headers?: Record<string, string>,
  timeout?: number,
  data?: D,
  retries?: number
}
