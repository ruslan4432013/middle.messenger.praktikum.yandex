import { type Controller } from './controller';

export interface Model {
  mount: () => void
  controller: Controller;
}
