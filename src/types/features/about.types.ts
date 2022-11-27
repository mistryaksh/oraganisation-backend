import * as Mongoose from "mongoose";

export interface IAboutProps {
     _id?: Mongoose.Schema.Types.ObjectId;
     ownerName: string;
     ownerImage: string;
     ownerWords: string;
     teamates: ITeamatesProps[];
     userId: string;
}

export interface ITeamatesProps {
     _id?: string;
     image: string;
     name: string;
     post: string;
     createdAt?: string;
     updatedAt?: string;
}
