import {Schema} from "mongoose";

export const BranchCommitsSchema = new Schema({
    branch: {type: Schema.Types.ObjectId, ref: 'branches'},
    commits: [
        {type: Schema.Types.ObjectId, ref: 'commits'}
    ],
    historical: [
        {
            user: { type: Schema.Types.ObjectId, ref: 'users' },
            action: {type: String},
            date: {type: Number},
        }
    ],
    deployEnvironment: {type: String},
    isDeployed: {type: Boolean},
    date: {type: Number},
    requester: { type: Schema.Types.ObjectId, ref: 'users' },
}, {
    versionKey: false // You should be aware of the outcome after set to false
});