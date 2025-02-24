import { Response } from "express";

class APIResponse<T> {
  private constructor(
    private readonly status: number,
    private readonly success: boolean,
    private readonly message: string,
    private readonly data?: T,
    private readonly error?: string | Record<string, any> | null,
    private readonly notification?: string
  ) {}

  static success<T>(
    data: T,
    message = "Success",
    statusCode = 200,
    notification?: string,
  ): APIResponse<T> {
    return new APIResponse<T>(statusCode, true, message, data, undefined, notification);
  }

  static error(
    message = "Error",
    statusCode = 500,
    error: string | Record<string, any> | null = null,
    notification?: string,
  ): APIResponse<null> {
    return new APIResponse<null>(statusCode, false, message, undefined, error, notification);
  }

  send(res: Response): void {
    res.status(this.status).json({
      success: this.success,
      statusCode: this.status,
      message: this.message,
      data: this.data,
      errorType: this.error,
      notification: this.notification,
    });
  }
}

export default APIResponse;
