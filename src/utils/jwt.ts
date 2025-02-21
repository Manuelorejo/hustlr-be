import jwt from "jsonwebtoken";
import config from "config";

export function signjwt(
  object: Object,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
  options?: jwt.SignOptions | undefined,
) {
  const signingkey = Buffer.from(
    config.get<string>(keyName),
    "base64",
  ).toString("ascii");

  return jwt.sign(object, signingkey, {
    ...(options && options),
  });
}

export function verifyjwt<T>(
  token: string | any,
  keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
): T | null {
  const publicKey = Buffer.from(config.get<string>(keyName), "base64").toString(
    "ascii",
  );
  try {
    const decode = jwt.verify(token, publicKey);
    return decode as T;
  } catch (error: any) {
    throw Error(error.message);
  }
}
