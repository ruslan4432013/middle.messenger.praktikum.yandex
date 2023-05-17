export * from './event-bus/types';
export * from './component/types';
export * from './utils/types';

export type Indexed<T = any> = {
  [key in string]: T;
};
