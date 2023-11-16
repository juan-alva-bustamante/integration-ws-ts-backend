import {Request, Response, Router} from "express";
import {CommonResponse} from "./CoomonResponse";
import {IBranchCommitRequest} from "../interfaces/Request/IBranchCommitRequest";
import {BranchesCommitsDao} from "../dao/BranchCommits/BranchesCommitsDao";
import { AwsDocumentDB } from "../persitence/utils/AwsDocumentDB";

export class CommitsController {

    public router: Router;

    constructor() {
        const router = Router();
        router.post("/", this.createRequest);
        router.get("/get-all", this.getAllRequest);
        router.get("/get-by-filter", this.getBranchRequestsByFilter);
        this.router = router;
    }

    public async createRequest(request: Request, response: Response) {
        try {
            await AwsDocumentDB.connectDatabase();
            const body: IBranchCommitRequest = request.body as any;
            const requestStatus = await new BranchesCommitsDao().createRequest(body);

            return CommonResponse.commonResponse(response, {
                code: 200,
                success: true,
                message: "Solicitud creada",
                data: requestStatus
            });
        } catch (err: any) {
            return CommonResponse.commonResponse(response, {
                code: 500,
                success: false,
                message: err.toString(),
                data: null
            });
        } finally {
            AwsDocumentDB.closeConnection();
        }
    }

    public async getAllRequest(request: Request, response: Response) {
        try {
            await AwsDocumentDB.connectDatabase();
            const allRequest = await new BranchesCommitsDao().getBranchCommitByFilter({});
            return CommonResponse.commonResponse(response, {
                code: 200,
                success: true,
                message: "Solicitudes obtenidas con exito",
                data: allRequest
            });
        } catch (err: any) {
            return CommonResponse.commonResponse(response, {
                code: 500,
                success: false,
                message: err.toString(),
                data: null
            });
        } finally {
            AwsDocumentDB.closeConnection();
        }
    }

    public async getBranchRequestsByFilter(request: Request, response: Response) {
        try {
            await AwsDocumentDB.connectDatabase();
            const params = request.query as any;
            console.log("✔ getRequestByUserId params ", params);
            let filter: any = {};
            if (params?.userId) {
                filter.requester = params.userId;
            }
            if (params?.branchId) {
                filter.branch = params.branchId;
            }
            const allRequest = await new BranchesCommitsDao().getBranchCommitByFilter(filter);
            return CommonResponse.commonResponse(response, {
                code: 200,
                success: true,
                message: "Solicitudes obtenidas con exito",
                data: allRequest
            });
        } catch (err: any) {
            return CommonResponse.commonResponse(response, {
                code: 500,
                success: false,
                message: err.toString(),
                data: null
            });
        } finally {
            AwsDocumentDB.closeConnection();
        }
    }
}