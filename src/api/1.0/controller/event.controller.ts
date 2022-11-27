import { Request, Response } from "express";
import { IController, IControllerRoutes } from "types";
import { Ok, UnAuthorized } from "utils";

import { Event } from "modal";
import { INewEventProps } from "types";
import { ProtectedRoute } from "middleware";

export class EventController implements IController {
     public routes: IControllerRoutes[] = [];
     constructor() {
          this.routes.push({
               handler: this.GetEvents,
               path: "/get-events",
               method: "GET",
          });
          this.routes.push({
               handler: this.GetEventsById,
               path: "/get-by-event-id/:eventid",
               method: "GET",
          });
          this.routes.push({
               handler: this.NewEvent,
               path: "/new-event",
               method: "POST",
               middleware: [ProtectedRoute],
          });
          this.routes.push({
               handler: this.UpdateEvents,
               path: "/update-event/:eventid",
               method: "PUT",
               middleware: [ProtectedRoute],
          });

          this.routes.push({
               handler: this.DeleteEvents,
               path: "/delete-event/:eventid",
               method: "DELETE",
               middleware: [ProtectedRoute],
          });
     }

     public async GetEvents(req: Request, res: Response) {
          try {
               const events = await Event.find();
               return Ok(res, events);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
     public async GetEventsById(req: Request, res: Response) {
          try {
               const _id = req.params.eventid;
               const event = await Event.findById({ _id: _id });

               return Ok(res, event);
          } catch (err) {
               return Ok(res, err);
          }
     }
     public async NewEvent(req: Request, res: Response) {
          try {
               const { description, name, pics }: INewEventProps = req.body;
               const newEvent = await new Event({
                    pics,
                    name,
                    description,
               }).save();
               if (newEvent.name) {
                    return Ok(res, `${newEvent.title} has been uploaded`);
               }
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async UpdateEvents(req: Request, res: Response) {
          try {
               const _id = req.params.eventid;
               const { description, name, pics }: INewEventProps = req.body;
               const updateQuery = await Event.findByIdAndUpdate(
                    {
                         _id: _id,
                    },
                    { $set: { pics: pics, description: description, name: name } }
               );
               if (updateQuery) {
                    return Ok(res, `${updateQuery.name} has been updated`);
               }
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
     public async DeleteEvents(req: Request, res: Response) {
          try {
               const _id = req.params._id;
               const deleteQuery = await Event.findByIdAndDelete({ _id });

               if (deleteQuery) {
                    return Ok(res, `${deleteQuery.name} has been deleted`);
               }
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
}
