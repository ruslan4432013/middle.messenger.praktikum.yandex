import { type Controller } from './controller';

export interface View {
  controller: Controller;
  root: HTMLElement;
  constructor(root: HTMLElement): this;
}
