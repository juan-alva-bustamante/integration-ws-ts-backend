import {Request, Response, Router} from "express";
import {CommonResponse} from "./CoomonResponse";
import {ILoginUser, IUserRequest} from "../interfaces/Request/IUserRequest";
import {UserService} from "../service/UserService";

export class UserController {

    public router: Router;

    constructor() {
            const router = Router();
            router.post("/", this.createUser);
            router.post("/login", this.loginUser);
            this.router = router;
    }

    public async createUser(request: Request, response: Response) {
        try {
            const body: IUserRequest = request.body as any;
            console.log("✔ createUser body ", body);

            if (!body.lastName || !body.firstName || !body.secondLastName || !body.githubUser || !body.password) {
                return CommonResponse.commonResponse(response, {
                    code: 400,
                    success: false,
                    message: "Parametros faltantes, favor de validar la peticion.",
                    data: null
                });
            }

            const newUser = await new UserService().createUser(body);

            return CommonResponse.commonResponse(response, {
                code: 200,
                success: true,
                message: "Usuario creado con exito",
                data: newUser
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

    public async loginUser(request: Request, response: Response) {
        try {
            const body: ILoginUser = request.body as any;
            console.log("✔ loginUser body ", body);

            if (!body.githubUser || !body.password) {
                return CommonResponse.commonResponse(response, {
                    code: 400,
                    success: false,
                    message: "Parametros faltantes, favor de validar la peticion.",
                    data: null
                });
            }

            const findUser = await new UserService().loginUser(body);

            if (!findUser) {
                return CommonResponse.commonResponse(response, {
                    code: 404,
                    success: false,
                    message: "Usuario o contraseña incorrectos.",
                    data: null
                });
            }
            return CommonResponse.commonResponse(response, {
                code: 200,
                success: true,
                message: "Usuario obtenido con exito.",
                data: findUser
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