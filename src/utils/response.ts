import { Response } from "express";

class APIResponse<T> {
  private constructor(
    private readonly status: number,
    private readonly success: boolean,
    private readonly message: string,
    private readonly data?: T,
    private readonly notification?: string
  ) {}

  static success<T>(
    data: T,
    message = "Success",
    statusCode = 200,
    notification?: string,
  ): APIResponse<T> {
    return new APIResponse<T>(statusCode, true, message, data, notification);
  }

  static error(
    message = "Error",
    statusCode = 500,
    notification?: string,
  ): APIResponse<null> {
    return new APIResponse<null>(statusCode, false, message, undefined, notification);
  }

  send(res: Response): void {
    res.status(this.status).json({
      success: this.success,
      statusCode: this.status,
      message: this.message,
      data: this.data,
      notification: this.notification,
    });
  }
}

export default APIResponse;
