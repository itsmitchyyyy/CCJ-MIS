export type ErrorExtensions = {
  errorCode: string;
  statusCode: number;
};

export type ApiErrorDTO = {
  message: string;
  extensions: ErrorExtensions;
};

export class ApiError extends Error {
  errors: ApiErrorDTO[];
  constructor({ name = '', errors }: { name?: string; errors: ApiErrorDTO[] }) {
    super(name);
    this.errors = errors;
  }
}
