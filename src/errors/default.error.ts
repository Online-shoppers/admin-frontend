import * as yup from 'yup';

const schema = yup.object({
  message: yup.string().required(),
  error: yup.string().required(),
  statusCode: yup.number().integer().moreThan(99).lessThan(600).required(),
});

export class DefaultError extends Error {
  constructor(message: string, error: string, code: number) {
    super(message);

    this.message = message;
    this.error = error;
    this.statusCode = code;
  }

  message: string;
  error: string;
  statusCode: number;

  public static validateType(value: unknown): value is DefaultError {
    return (
      !!value &&
      typeof value === 'object' &&
      Object.keys(value).length === 3 &&
      schema.isValidSync(value)
    );
  }
}
