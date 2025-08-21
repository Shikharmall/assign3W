import type { Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    points?: number[];
    createdAt?: Date;
    updatedAt?: Date;
}