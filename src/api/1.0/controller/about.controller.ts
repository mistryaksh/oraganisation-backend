import { Request, Response } from "express";
import { About, User } from "modal";
import { IAboutProps, IController, IControllerRoutes, ILoginProps, INewUserProps } from "types";
import { GetCurrentUser, Ok, UnAuthorized } from "utils";

import { ProtectedRoute } from "middleware";

export class AboutController implements IController {
     public routes: IControllerRoutes[] = [];
     constructor() {
          this.routes.push({
               handler: this.CreateAbout,
               path: "/new-about/:userId",
               middleware: [ProtectedRoute],
               method: "POST",
          });
          this.routes.push({
               handler: this.getAbout,
               path: "/get-about",
               method: "GET",
          });
          this.routes.push({
               handler: this.updateAbout,
               path: "/update-about/:userId",
               method: "GET",
               middleware: [ProtectedRoute],
          });
     }

     public async CreateAbout(req: Request, res: Response) {
          try {
               const { ownerImage, ownerName, teamates, ownerWords, userId }: IAboutProps = req.body;
               const AboutInfo = new About({ ownerImage, ownerName, ownerWords, teamates, userId }).save();

               return Ok(res, `${(await AboutInfo).ownerName} your website data is uploaded!`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
     public async getAbout(req: Request, res: Response) {
          try {
               const currentUser = GetCurrentUser(req, res);
               console.log(currentUser);
               // const aboutinfo = await About.findOne({ userId: req.params.userId });

               return Ok(res, "About info will comes here");
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
     public async updateAbout(req: Request, res: Response) {
          try {
               const { ownerImage, ownerName, ownerWords, teamates }: IAboutProps = req.body;
               const aboutinfo = await About.findOneAndUpdate(
                    { userId: req.params.userId },
                    { $set: { ownerImage, ownerName, ownerWords, teamates } }
               );

               return Ok(res, `${aboutinfo} website details is updated!`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
}
