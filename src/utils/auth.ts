import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const GetUserToken = (req: Request, res: Response) => {
     console.log(req.cookies.access_token);
     return req.cookies.access_token;
};

export const GetCurrentUser = (req: Request, res: Response) => {
     const usertoken = GetUserToken(req, res);
     const verifiedUser = jwt.decode(usertoken);
     console.log(verifiedUser);
};
