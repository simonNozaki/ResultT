/**
 * Value Not Found Exception.
 * This exception (extended `Error`) means an expected value is not
 * found on some `Resultt` instance.
 */
export class ValueNotFoundException extends Error {
  /**
   * constructor
   * @param {string} message
   */
  constructor(message?: string) {
    super(message);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
