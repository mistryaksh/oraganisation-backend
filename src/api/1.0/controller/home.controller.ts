import { Request, Response } from "express";

import { IController, IControllerRoutes } from "types";
import { Ok, UnAuthorized } from "utils";

export class HomeController implements IController {
     public routes: IControllerRoutes[] = [];
     constructor() {
          this.routes.push({
               handler: this.homepage,
               path: "/",
               method: "GET",
          });
     }

     public async homepage(req: Request, res: Response) {
          try {
               return Ok(res, "api is working");
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
}
