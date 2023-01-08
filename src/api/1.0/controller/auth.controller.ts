import { Request, Response } from "express";
import { User } from "modal";
import { IController, IControllerRoutes, ILoginProps, INewUserProps } from "types";
import { Ok, UnAuthorized } from "utils";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";
import { ProtectedRoute } from "middleware";

export class AuthController implements IController {
     public routes: IControllerRoutes[] = [];
     constructor() {
          this.routes.push({
               handler: this.getUsers,
               path: "/get-users/:userId",
               middleware: [ProtectedRoute],
               method: "GET",
          });
          this.routes.push({
               handler: this.signup,
               path: "/signup",
               method: "POST",
          });
          this.routes.push({
               handler: this.signin,
               path: "/signin",
               method: "POST",
          });

          this.routes.push({
               handler: this.signout,
               path: "/signout",
               method: "POST",
          });
     }

     public async getUsers(req: Request, res: Response) {
          try {
               const users = await User.findById({ _id: req.params.userId });

               return Ok(res, users);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async signup(req: Request, res: Response) {
          const { email, password, mobile, username }: INewUserProps = req.body;
          const userExist = await User.findOne({ email });

          if (!email || !password || !mobile || !username) {
               return UnAuthorized(res, "all field is required");
          }

          const hashedPassword = bcrypt.hashSync(password, 10);

          if (userExist) {
               return UnAuthorized(res, "email is already registered with us");
          }

          const newuser = await new User({
               email: email,
               password: hashedPassword,
               mobile: mobile,
               username: username,
               role: "USER",
          }).save();

          const token = jwt.sign(
               {
                    email: newuser.email,
                    role: newuser.role,
               },
               process.env.JWT_SECRET || config.get("JWT_SECRET"),
               { expiresIn: process.env.JWT_EXPIRE || config.get("JWT_EXPIRE"), algorithm: "HS256" }
          );

          return Ok(res, {
               message: `${email} is registered with us.`,
               token,
          });
     }

     public async signin(req: Request, res: Response) {
          try {
               const { email, password }: ILoginProps = req.body;
               const userExist = await User.findOne({ email: email });

               if (!email || !password) {
                    return UnAuthorized(res, "missing credentials");
               }

               if (!userExist) {
                    return UnAuthorized(res, "email is not registered with us");
               }

               if (!bcrypt.compareSync(password, userExist.password)) {
                    return UnAuthorized(res, "invalid credentials");
               }

               const token = jwt.sign(
                    {
                         email: email,
                         role: userExist.role,
                    },
                    process.env.JWT_SECRET || config.get("JWT_SECRET"),
                    { expiresIn: process.env.JWT_EXPIRE || config.get("JWT_EXPIRE"), algorithm: "HS256" }
               );
               var now = Date.now();

               res.cookie("access_token", token, {
                    httpOnly: true,
                    // sameSite: false,
                    // secure: false,
                    // expires: new Date(new Date(now).setHours(now + 3)),
               });

               return Ok(res, {
                    email: email,
                    token,
               });
          } catch (err) {
               console.log(err);
               return UnAuthorized(res, err);
          }
     }
     public async signout(req: Request, res: Response) {
          try {
               res.clearCookie("access_token", {});
               return Ok(res, "Logout successfully");
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
}
