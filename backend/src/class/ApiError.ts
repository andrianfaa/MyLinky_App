class ApiError extends Error {
  statusCode: number;

  /**
   * ApiError instance with the provided status code and message.
   *
   * @param {number} statusCode - The status code for the error.
   * @param {string} message - The message for the error.
   */
  constructor(statusCode: number, message: string) {
    super(message);

    this.statusCode = statusCode;
  }

  /**
   * Creates a new ApiError instance with a status code of 400 and the provided message.
   *
   * @param {string} message - The error message for the bad request.
   * @return {ApiError} A new ApiError instance representing a bad request.
   */
  static badRequest(message: string): ApiError {
    return new ApiError(400, message);
  }

  /**
   * Creates a new ApiError with a 404 status code and the given message.
   *
   * @param {string} message - The message for the ApiError
   * @return {ApiError} The newly created ApiError
   */
  static notFound(message: string): ApiError {
    return new ApiError(404, message);
  }

  /**
   * Creates a new ApiError with status code 500 and the given message.
   *
   * @param {string} message - the error message
   * @return {ApiError} the new ApiError instance
   */
  static internalServerError(message: string): ApiError {
    return new ApiError(500, message);
  }

  /**
   * Creates an ApiError with status code 401 and the given message.
   *
   * @param {string} message - the error message
   * @return {ApiError} the created ApiError object
   */
  static unauthorized(message: string): ApiError {
    return new ApiError(401, message);
  }

  /**
   * Create an ApiError with status code 403 and the given message.
   *
   * @param {string} message - the error message
   * @return {ApiError} the created ApiError
   */
  static forbidden(message: string): ApiError {
    return new ApiError(403, message);
  }

  /**
   * Create a new ApiError with a 409 status code and the given message.
   *
   * @param {string} message - the error message
   * @return {ApiError} the new ApiError object
   */
  static conflict(message: string): ApiError {
    return new ApiError(409, message);
  }
}

export default ApiError;
