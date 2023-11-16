import * as dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

import {GithubController} from "./api/GithubController"
import {UserController} from "./api/UserController";
import {CommitsController} from "./api/CommitsController";
import {AwsDocumentDB} from "./persitence/utils/AwsDocumentDB";
import {BranchController} from "./api/BranchController";

const cors = require("cors");
dotenv.config();

class App {

    public express: any;
    private githubController: GithubController;
    private userController: UserController;
    private commitsController: CommitsController;
    private branchController: BranchController;
    private DB: AwsDocumentDB;

    constructor() {
        this.DB = new AwsDocumentDB();
        this.express = express();
        this.express.use(morgan("dev"));
        this.express.use(cors({origin: true}));
        this.githubController = new GithubController();
        this.userController = new UserController();
        this.commitsController = new CommitsController();
        this.branchController = new BranchController();
        this.initializeMiddlewares();
        this.initializeRoutes();
    }

    private initializeMiddlewares(port?: number): void {
        this.express.use(bodyParser.json({limit: "100mb"}));
        this.express.use(bodyParser.urlencoded({limit: "100mb", extended: true}));
    }

    private async initializeRoutes() {
        const router = express.Router();
        router.use("/gitlog", this.githubController.router);
        router.use("/user", this.userController.router);
        router.use("/deploy-request", this.commitsController.router);
        router.use("/branch", this.branchController.router);
        this.express.use("/", router);
    }

    public getRouter() {
        return this.express
    }
}

export default new App().express;