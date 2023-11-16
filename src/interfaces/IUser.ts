import {Document} from "mongoose";
import {IUserRequest} from "./Request/IUserRequest";

export interface IUserModel extends IUser, Document {
    _id?: string;
}

export interface IUser extends IUserRequest {
    creationDate: Number;
    role: string;
    isPasswordUpdated: boolean;
}