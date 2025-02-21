import { NextFunction, Request, Response } from "express";
import APIResponse from "../utils/response";

const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  if (!user) APIResponse.error("Access token is required").send(res);
  next();
};

export default authenticateUser;
