import {Request, Response, Router} from "express";
import {GithubService} from "../service/GithubService";
import {IBranchesRequest, IGithubRequest} from "../interfaces/Request/IGithubRequest";
import {CommonResponse} from "./CoomonResponse";

export class GithubController {

    public router: Router;

    constructor() {
        const router = Router();
        router.get("/history", this.getGitlogHistory);
        router.get("/branches", this.getGitlogBranches);
        this.router = router;
    }

    public async getGitlogBranches(request: Request, response: Response) {
        try {
            const queryParams: IBranchesRequest = request.query as any;
            console.log("✔ queryParams ", queryParams);

            if (!queryParams.repoDir || queryParams.repoDir === "") {
                return CommonResponse.commonResponse(response, {
                    code: 400,
                    success: true,
                    message: "Paramtro 'repoDir' faltante. Favor de validar la peticion.",
                    data: null
                });
            }

            const githubService = new GithubService();
            const data = await githubService.getGitbranches(queryParams);

            return CommonResponse.commonResponse(response, {
                code: 200,
                success: true,
                message: "Versiones github",
                data: data
            });
        } catch (err) {
            return CommonResponse.commonResponse(response, {
                code: 500,
                success: false,
                message: "Error al obtener el historico de cambios.",
                data: null
            });
        }
    }

    public async getGitlogHistory(request: Request, response: Response) {
        try {
            const queryParams: IGithubRequest = request.query as any;
            console.log("✔ queryParams ", queryParams);

            if (!queryParams.repoDir || queryParams.repoDir === "") {
                return CommonResponse.commonResponse(response, {
                    code: 400,
                    success: true,
                    message: "Paramtro 'repoDir' faltante. Favor de validar la peticion.",
                    data: null
                });
            }

            const githubService = new GithubService();
            const data = await githubService.getCommitHistory(queryParams);

            if (data.commits.length === 0) {
                return CommonResponse.commonResponse(response, {
                    code: 200,
                    success: true,
                    message: "No se encontraron resultados para el usuario, valide la informacion",
                    data: []
                });
            }

            return CommonResponse.commonResponse(response, {
                code: 200,
                success: true,
                message: "Versiones github",
                data: data
            });
        } catch (err) {
            return CommonResponse.commonResponse(response, {
                code: 500,
                success: false,
                message: "Error al obtener las ramas.",
                data: null
            });
        }
    }

}