import { NextFunction, Request, Response } from "express";
import { UnAuthorized } from "utils";

export const ProtectedRoute = (req: Request, res: Response, next: NextFunction) => {
     try {
          const token = req.cookies.access_token;
          if (!token) {
               return UnAuthorized(res, "You must be sign in to your account for accessing this page!");
          }
          next();
     } catch (err) {
          return UnAuthorized(res, err);
     }
};
