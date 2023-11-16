import {BranchModel} from "./BranchModel";
import {ApiException} from "../../exception/ApiException";
import {BranchCommitsModel} from "../BranchCommits/BranchCommitsModel";

export class BranchDao {

    private branchModel = BranchModel;
    private branchCommitModel = BranchCommitsModel;

    public async getCommitsByBranch(branchId: string) {
        try {
            return await this.branchCommitModel.find({branch: branchId}).populate({
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
            throw new ApiException(500, err.toString());
        }
    }

    public async getAllBranches() {
        try {
            return await this.branchModel.find();
        } catch (err: any) {
            console.error("❌ Error al obtener ramas ", err.toString());
            throw new ApiException(500, err.toString());
        }
    }

    public async getBranchByName(branchName: string, userId: string) {
        try {
            const filter = {
                name: branchName,
                author: userId
            }
            return await this.branchModel.findOne(filter);
        } catch (err: any) {
            console.error("❌ Error al obtener ramas ", err.toString());
            throw new ApiException(500, err.toString());
        }
    }

    public async createBranch(branchName: string, userId: string) {
        try {
            return await new BranchModel({
                name: branchName,
                creationDate: new Date().getTime(),
                author: userId
            }).save();
        } catch (err: any) {
            console.error("❌ Error al obtener ramas ", err.toString());
            throw new ApiException(500, "Error de comunicación, intenta de nuevo");
        }
    }
}