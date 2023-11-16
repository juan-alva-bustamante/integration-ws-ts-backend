import {ApiException} from "../exception/ApiException";
import {IBranchesRequest, IGithubRequest} from "../interfaces/Request/IGithubRequest";

import gitlog, {GitlogOptions} from "gitlog";

import {simpleGit, CleanOptions, SimpleGitOptions, SimpleGit} from 'simple-git';
import {IGitlogRequest} from "../interfaces/Request/IGitlogRequest";

simpleGit().clean(CleanOptions.FORCE);

export class GithubService {

    public async getGitbranches(queryParams: IBranchesRequest) {
        // const repoDir = "C:\\Users\\Juan Alva\\Documents\\Projects\\UPAXDev\\reclutalia-front-web";
        try {
            const repoDir = queryParams.repoDir;

            const options: Partial<SimpleGitOptions> = {
                baseDir: repoDir,
                binary: 'git',
                maxConcurrentProcesses: 6,
                trimmed: false,
            };

            // when setting all options in a single object
            const git: SimpleGit = simpleGit(options);

            const branches = git.branch()
            return branches;
        } catch (e: any) {
            console.log("❌ Error al obtener ramas ", e.toString());
            Promise.reject(e);
        }
    }

    public async getCommitHistory(queryParams: IGithubRequest) {
        try {
            // const repoDir = "C:\\Users\\Juan Alva\\Documents\\Projects\\UPAXDev\\reclutalia-front-web";
            const repoDir = queryParams.repoDir;

            const options: GitlogOptions<any> = {
                repo: repoDir,
                number: 100,
                // author: "Juan Alva",
                fields: ["subject", "hash", "abbrevHash", "subject", "authorName", "authorDateRel", "authorDate"],
                execOptions: {maxBuffer: 1000 * 1024},
                branch: "master"
            };

            if (queryParams.author) {
                options.author = queryParams.author;
            }

            if (queryParams.limit) {
                options.number = queryParams.limit;
            }

            if (queryParams.branch) {
                options.branch = queryParams.branch;
            }

            const commits: any = gitlog(options);
            return {
                branch: options.branch,
                author: options.author,
                totalCommits: commits.length,
                commits: commits
            } as IGitlogRequest;
        } catch (err: any) {
            console.log("Error al obtener git");
            console.log(err);
            throw new ApiException(500, String(err));
        }
    }

}