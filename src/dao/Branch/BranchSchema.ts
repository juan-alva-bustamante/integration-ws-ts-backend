import {Schema} from "mongoose";

export const BranchSchema = new Schema({
    name: {type: String},
    creationDate: {type: Number},
    author: { type: Schema.Types.ObjectId, ref: 'users' },
}, {
    versionKey: false // You should be aware of the outcome after set to false
});