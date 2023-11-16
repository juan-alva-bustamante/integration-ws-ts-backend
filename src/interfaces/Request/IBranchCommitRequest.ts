import {ICommitModelRequestBody} from "../ICommit";

export interface IBranchCommitRequest {
    branch: string;
    commits: ICommitModelRequestBody[];
    deployEnvironment: string;
    requester: string;
}