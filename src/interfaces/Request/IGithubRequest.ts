export interface IBranchesRequest {
    repoDir: string
}

export interface IGithubRequest extends IBranchesRequest {
    author?: string,
    limit?: number,
    branch?: string
}