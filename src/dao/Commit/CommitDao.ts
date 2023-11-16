import {AwsDocumentDB} from "../../persitence/utils/AwsDocumentDB";
import {CommitModel} from "./CommitModel";
import {ApiException} from "../../exception/ApiException";
import {ICommitModelRequestBody} from "../../interfaces/ICommit";

export class CommitDao {

    private commitModel = CommitModel;

    public async createCommit(body: ICommitModelRequestBody) {
        try {
            const newCommit = new CommitModel({
                ...body
            });
            return await newCommit.save();
        } catch (e) {
            throw new ApiException(500, "Error de comunicación, intenta de nuevo");
        }
    }

    public async createManyCommits(body: ICommitModelRequestBody[]) {
        try {
            return await this.commitModel.insertMany(body);
        } catch (e) {
            throw new ApiException(500, "Error de comunicación, intenta de nuevo");
        }
    }

    public async getCommitsByBranchName(body: any) {
        try {
            const githubUser = body.githubUser;
            let filter: any = {
                requester: githubUser
            }
            return await this.commitModel.find(filter);
        } catch (e) {
            throw new ApiException(500, "Error de comunicación, intenta de nuevo");
        }
    }

}