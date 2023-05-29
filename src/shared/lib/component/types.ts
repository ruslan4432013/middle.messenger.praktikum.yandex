import { type Component } from './index';

export type PropWithoutChildren<T extends Record<string, unknown>> = {
  [P in keyof T]: T[P] extends Component ? never : T[P]
};

export type ChildrenProps<T extends Record<string, unknown>> = {
  [P in keyof T]: T[P] extends Component ? (T[P] | T[P][]) : never
};

export type GetChildrenReturn<Props extends PropType> = {
  children: ChildrenProps<Props>,
  props: PropWithoutChildren<Props>
};
