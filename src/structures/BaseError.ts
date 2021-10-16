export class BaseError extends Error {
  public name: string;

  public constructor(error: string) {
    super(error);
    this.name = "BaseError";
  }
}
