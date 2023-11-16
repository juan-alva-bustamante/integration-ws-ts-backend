import {Request, Response, Router} from "express";
import {CommonResponse} from "./CoomonResponse";
import {BranchDao} from "../dao/Branch/BranchDao";

export class BranchController {

    public router: Router;

    constructor() {
        const router = Router();
        router.get("/get-all", this.getAllBranches);
        this.router = router;
    }

    public async getAllBranches(request: Request, response: Response) {
        try {
            const allRequest = await new BranchDao().getAllBranches();
            return CommonResponse.commonResponse(response, {
                code: 200,
                success: true,
                message: "Ramas obtenidas con exito",
                data: allRequest
            });
        } catch (err: any) {
            return CommonResponse.commonResponse(response, {
                code: 500,
                success: false,
                message: err.toString(),
                data: null
            });
        }
    }
}