import {BranchesCommitsDao} from "../dao/BranchCommits/BranchesCommitsDao";

export class BranchCommits {
    private branchesCommitsDao: BranchesCommitsDao;

    constructor() {
        this.branchesCommitsDao = new BranchesCommitsDao();
    }
}