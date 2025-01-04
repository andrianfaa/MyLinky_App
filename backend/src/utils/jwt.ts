import type { JwtPayload, SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export const signJwt = (payload: JwtPayload, opts?: SignOptions) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    ...opts,
    expiresIn: opts?.expiresIn || "3d"
  });

  return token;
};

export const verifyJwt = <T>(token: string): T | null => {
  const verify = jwt.verify(token, process.env.JWT_SECRET as string);

  if (verify) {
    return verify as unknown as T;
  }

  return null;
};
