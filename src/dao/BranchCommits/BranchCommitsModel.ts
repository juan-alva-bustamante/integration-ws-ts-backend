import * as mongoose from "mongoose";
import {BranchCommitsSchema} from "./BranchCommitsSchema";
import {IBranchCommitsModel} from "../../interfaces/IBranchCommits";

export const BranchCommitsModel = mongoose.model<IBranchCommitsModel>("branchcommits", BranchCommitsSchema);
