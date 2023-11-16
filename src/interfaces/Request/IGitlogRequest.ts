import {ICommitModelRequestBody} from "../ICommit";

export interface ICommitBase extends ICommitModelRequestBody {
    authorDateRel: string
}

export interface IGitlogRequest {
    branch: string
    author: string
    totalCommits: number
    commits: ICommit[]
}

export interface ICommit extends ICommitBase {
    status: string[]
    authorDateRel: string
}