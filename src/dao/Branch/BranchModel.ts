import * as mongoose from "mongoose";
import {BranchSchema} from "./BranchSchema";
import {IBranchModel} from "../../interfaces/IBranch";

export const BranchModel = mongoose.model<IBranchModel>("branches", BranchSchema);
