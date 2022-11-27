import { NextFunction, Request, Response } from "express";
import { UnAuthorized } from "utils";

export const ProtectedRoute = (req: Request, res: Response, next: NextFunction) => {
     if (!req.cookies.access_token) {
          return UnAuthorized(res, "Please login first");
     }
     next();
};
