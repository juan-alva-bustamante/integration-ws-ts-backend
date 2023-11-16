import {Document} from "mongoose";

export interface ICommitModelRequestBody {
    abbrevHash: string
    authorDate: string
    authorName: string
    files: string[]
    hash: string
    subject: string
}

export interface ICommitModel extends Document, ICommitModelRequestBody {
    _id?: string
}