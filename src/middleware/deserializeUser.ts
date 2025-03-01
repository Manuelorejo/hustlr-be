import { NextFunction, Request, Response } from "express";
import { verifyjwt } from "../utils/jwt";
import BlacklistModel from "../features/auth/blacklist/blacklist.model";
import APIResponse from "../utils/response";

const deserialize = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = (req.headers.authorization || "").replace(
      /^Bearer\s/,
      ""
    );

    if (!accessToken) return next();


    // 🔹 Check if token is blacklisted
    const blacklistedToken = await BlacklistModel.findOne({ token: accessToken });
    if (blacklistedToken) {
      return APIResponse.error("Unauthorized: Token is expired", 401).send(res);
    }

    // 🔹 Verify token
    const decodedToken = await verifyjwt(accessToken, "accessTokenPrivateKey");
    res.locals.user = decodedToken;
    
    next();
  } catch (error) {
    APIResponse.error((error as Error).message, 401).send(res);
  }
};

export default deserialize;
