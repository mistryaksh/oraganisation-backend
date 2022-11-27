import { Request, Response } from "express";
import { ProtectedRoute } from "middleware";
import { Contact } from "modal/contact";
import { Schema } from "mongoose";
import { IContactProps, IController, IControllerRoutes } from "types";
import { Ok, UnAuthorized } from "utils";

export class ContactController implements IController {
     public routes: IControllerRoutes[] = [];

     constructor() {
          this.routes.push({
               handler: this.AddNewContact,
               method: "POST",
               path: "/new-contact",
               middleware: [ProtectedRoute],
          });
          this.routes.push({
               handler: this.GetContactDetails,
               method: "GET",
               path: "/contact",
               middleware: [ProtectedRoute],
          });

          this.routes.push({
               handler: this.DeleteContactDetail,
               method: "DELETE",
               path: "/delete-contact/:contactId",
               middleware: [ProtectedRoute],
          });
     }
     public async AddNewContact(req: Request, res: Response) {
          try {
               const { address, email, openfrom, phone, userId }: IContactProps = req.body;

               const data = new Contact({
                    address,
                    email,
                    openfrom,
                    phone,
                    userId,
               }).save();

               if (data) {
                    return Ok(res, `contact details has been uploaded`);
               }
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async GetContactDetails(req: Request, res: Response) {
          try {
               const contactDetails = await Contact.findOne();

               return Ok(res, contactDetails);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async DeleteContactDetail(req: Request, res: Response) {
          try {
               const contactId = req.params.contactId;

               await Contact.findOneAndDelete({ _id: contactId });

               return Ok(res, `Contact details have been deleted`);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
}
