import {Schema} from "mongoose";

export const UserSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    secondLastName: {type: String},
    githubUser: {type: String},
    creationDate: {type: Number},
    role: {type: String},
    password: {type: String},
    isPasswordUpdated: {type: Boolean}
}, {
    versionKey: false // You should be aware of the outcome after set to false
});