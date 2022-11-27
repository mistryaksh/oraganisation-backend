import mongoose from "mongoose";

export interface IContactProps {
     _id?: string;
     phone: string;
     email: string;
     address: string;
     openfrom: string;
     userId: mongoose.Schema.Types.ObjectId;
}
