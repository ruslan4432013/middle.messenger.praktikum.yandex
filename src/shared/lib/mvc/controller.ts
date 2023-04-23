import { type BaseModel } from './model';

export abstract class BaseController<T = unknown> {
  public readonly abstract model: BaseModel<T>;
}
