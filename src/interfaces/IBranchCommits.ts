import {Document} from "mongoose";
import {IBranch} from "./IBranch";

export interface IBranchCommit {
    branch: IBranch;
    commits: string[]
    historical: IHistorical[]
    deployEnvironment: string
    isDeployed: boolean
    date: number
    requester: string
}

export interface IBranchCommitsModel extends Document, IBranchCommit {
    _id: string;
}

interface IHistorical {
    user: string,
    action: string,
    date: number
}