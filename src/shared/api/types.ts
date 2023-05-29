export * from './user/types';

export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface Options<D extends Record<string, unknown> = Record<string, unknown>> {
  method: Methods,
  headers?: Record<string, string>,
  timeout?: number,
  data?: D | FormData,
  retries?: number
}

export interface DefaultResult {
  status: number;
  statusText: string;
  data: string;
  headers: string;
}

type SuccessResult = {
  ok: true;
  json: <T>() => T;
} & DefaultResult;

type BadResult = {
  ok: false;
  json: () => { reason: string };
} & DefaultResult;

export type RequestResult = SuccessResult | BadResult;
