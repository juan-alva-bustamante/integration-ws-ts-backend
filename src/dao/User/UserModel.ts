import * as mongoose from "mongoose";
import {UserSchema} from "./UserSchema";
import {IUserModel} from "../../interfaces/IUser";

export const UsersModel = mongoose.model<IUserModel>("users", UserSchema);
