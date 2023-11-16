import {Document} from "mongoose";

export interface IBranch {
    name: string
    creationDate: number
    author: string
}

export interface IBranchModel extends IBranch, Document {
    _id?: string
}