import * as Mongoose from "mongoose";

export interface IUserProps {
     _id?: Mongoose.Schema.Types.ObjectId;
     username: string;
     email: string;
     mobile: string;
     password: string;
     role: string;
     createdAt?: Mongoose.Schema.Types.String;
     updatedAt?: Mongoose.Schema.Types.String;
}

export interface INewUserProps {
     email: string;

     username: string;
     mobile: string;
     password: string;
     role?: string;
}

export interface ILoginProps {
     email: string;
     password: string;
}
