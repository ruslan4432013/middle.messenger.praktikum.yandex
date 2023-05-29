export * from './event-bus/types';
export * from './component/types';
export * from './utils/types';

export type Indexed<T = unknown> = {
  [key in string]: T;
};
