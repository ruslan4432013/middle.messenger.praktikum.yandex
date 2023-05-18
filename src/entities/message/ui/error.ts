export class UnexpectedError extends Error {
  constructor(value: never) {
    super(`Unknown type ${value}`);
  }
}
