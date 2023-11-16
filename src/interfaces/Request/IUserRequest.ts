import {IUserModel} from "../IUser";

export interface IUserRequest extends ILoginUser {
    firstName: string;
    lastName: string;
    secondLastName: string;
}

export interface IUserResponse extends IUserModel {

}

export interface IUpdateUserRole {
    rol: string;
}

export interface ILoginUser {
    githubUser: string;
    password: string;
}