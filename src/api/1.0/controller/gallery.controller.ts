import { Request, Response } from "express";
import { Gallery } from "modal";
import { IController, IControllerRoutes, INewGalleryProps } from "types";
import { Ok, UnAuthorized } from "utils";

export class GalleryController implements IController {
     public routes: IControllerRoutes[] = [];

     constructor() {
          this.routes.push({
               handler: this.GetAllGallery,
               method: "GET",
               path: "/get-my-gallery",
          });
          this.routes.push({
               handler: this.GetGalleryById,
               method: "GET",
               path: "/get-by-gallery-id/:galleryid",
          });
          this.routes.push({
               handler: this.NewGallery,
               method: "POST",
               path: "/new-gallery",
          });
          this.routes.push({
               handler: this.UpdateSingleGallery,
               method: "PUT",
               path: "/update-gallery/:galleryid",
          });

          this.routes.push({
               handler: this.DeleteSingalGallery,
               method: "DELETE",
               path: "/delete-gallery/:galleryid",
          });
     }

     public async GetAllGallery(req: Request, res: Response) {
          try {
               const galleries = await Gallery.find().sort({ createdAt: -1 });
               return Ok(res, galleries);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
     public async NewGallery(req: Request, res: Response) {
          try {
               const { description, image, title }: INewGalleryProps = req.body;

               const newGallery = await new Gallery({
                    image,
                    title,
                    description,
               }).save();
               if (newGallery.title) {
                    return Ok(res, `${newGallery.title} has been uploaded`);
               }
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
     public async GetGalleryById(req: Request, res: Response) {
          try {
               const _id = req.params.galleryid;
               const gallery = await Gallery.findById({ _id: _id });

               return Ok(res, gallery);
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }

     public async UpdateSingleGallery(req: Request, res: Response) {
          try {
               const _id = req.params._id;
               const { title, description, image } = req.body;
               const updateQuery = await Gallery.findOneAndUpdate(
                    { _id: _id },
                    { $set: { title: title, description: description, image: image } }
               );

               if (updateQuery) {
                    return Ok(res, `${updateQuery.title} has been updated`);
               }
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
     public async DeleteSingalGallery(req: Request, res: Response) {
          try {
               const _id = req.params._id;
               const updateQuery = await Gallery.findByIdAndDelete({ _id: _id });

               if (updateQuery) {
                    return Ok(res, `${updateQuery.title} has been deleted`);
               }
          } catch (err) {
               return UnAuthorized(res, err);
          }
     }
}
