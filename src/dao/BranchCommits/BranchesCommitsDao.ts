import {BranchCommitsModel} from "./BranchCommitsModel";
import {BranchModel} from "../Branch/BranchModel";
import {CommitModel} from "../Commit/CommitModel";
import {UsersModel} from "../User/UserModel";

import {IBranchCommitRequest} from "../../interfaces/Request/IBranchCommitRequest";
import {CommitDao} from "../Commit/CommitDao";
import {BranchDao} from "../Branch/BranchDao";

export class BranchesCommitsDao {

    private branchCommitModel = BranchCommitsModel;
    private branch = BranchModel;
    private commitModel = CommitModel;
    private userModel = UsersModel;

    private commitDato: CommitDao;
    private branchDao: BranchDao;

    constructor() {
        this.commitDato = new CommitDao();
        this.branchDao = new BranchDao();
    }

    public async createRequest(body: IBranchCommitRequest) {
        try {
            const commits = body.commits;
            const newCommits = await this.commitDato.createManyCommits(commits);
            const commitsId = newCommits.map((commit) => commit._id);

            const branchExists = await this.branchDao.getBranchByName(body.branch, body.requester);

            let branchId: any = "";
            if (!branchExists) {
                console.log("👽 Se crea nueva rama ", body.branch);
                const createBranch = await this.branchDao.createBranch(body.branch, body.requester);
                branchId = createBranch._id;
            } else {
                branchId = branchExists?._id;
            }

            console.log("👽 Se crea Rama-commits ", body.branch);
            return new BranchCommitsModel({
                branch: branchId,
                commits: commitsId,
                requester: body.requester,
                deployEnvironment: body.deployEnvironment,
                historical: [
                    {
                        user: body.requester,
                        action: "Solicitud creada",
                        date: new Date().getTime()
                    }
                ],
                isDeployed: false,
                date: new Date().getTime()
            }).save();

        } catch (e: any) {
            return Promise.reject(e.toString());
        }
    }

    public async getBranchCommitByFilter(filter: any) {
        try {
            return await this.branchCommitModel.find(filter).populate({
                path: 'commits',
                model: 'commits'
            }).populate({
                path: 'branch',
                model: 'branches'
            }).populate({
                path: 'requester',
                model: 'users'
            }).populate({
                path: 'historical',
                populate: {
                    path: "user",
                    model: 'users'
                }
            });
        } catch (err: any) {
            console.error("❌ Error al obtener ramas ", err.toString());
            return Promise.reject(err.toString());
        }
    }
}