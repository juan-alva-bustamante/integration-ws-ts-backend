import * as mongoose from "mongoose";
import {CommitSchema} from "./CommitSchema";
import {ICommitModel} from "../../interfaces/ICommit";

export const CommitModel = mongoose.model<ICommitModel>("commits", CommitSchema);
