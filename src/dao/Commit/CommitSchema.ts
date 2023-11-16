import {Schema} from "mongoose";

export const CommitSchema = new Schema({
    abbrevHash: {type: String},
    authorDate: {type: String},
    authorName: {type: String},
    files: [
        {type: String}
    ],
    hash: {type: String},
    subject: {type: String}
}, {
    versionKey: false // You should be aware of the outcome after set to false
});