import { IDecodedJWTToken } from "../interfaces/IDecodedJWTToken";

declare module "express-serve-static-core" {
  export interface Request {
    decodedJwt?: IDecodedJWTToken;
  }
}