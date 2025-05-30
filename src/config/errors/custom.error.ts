export class CustomError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message: string) {
    return new CustomError(message, 400);
  }

  static notFound(message: string) {
    return new CustomError(message, 404);
  }

  static internal(message: string) {
    return new CustomError(message, 500);
  }

  static unauthorized(message: string) {
    return new CustomError(message, 401);
  }

  static forbidden(message: string) {
    return new CustomError(message, 403);
  }

  static conflict(message: string) {
    return new CustomError(message, 409);
  }

  static unprocessable(message: string) {
    return new CustomError(message, 422);
  }

  static tooManyRequests(message: string) {
    return new CustomError(message, 429);
  }

}