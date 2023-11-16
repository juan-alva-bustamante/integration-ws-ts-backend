import {ApiException} from "../exception/ApiException";
import {UserDao} from "../dao/User/UserDao";
import {ILoginUser, IUpdateUserRole, IUserRequest} from "../interfaces/Request/IUserRequest";

export class UserService {

    private userDao: UserDao;

    constructor() {
        this.userDao = new UserDao();
    }

    public async createUser(body: IUserRequest) {
        try {
            return await this.userDao.createUser(body);
        } catch (err: any) {
            throw new ApiException(500, err);
        }
    }

    public async updateUserRol(userId: string, body: IUpdateUserRole) {
        try {
            return await this.userDao.updateUserRol(userId, body);
        } catch (err: any) {
            throw new ApiException(500, err);
        }
    }

    public async deleteUserById(userId: string) {
        try {
            return await this.userDao.deleteUserById(userId);
        } catch (err: any) {
            throw new ApiException(500, err);
        }
    }

    public async loginUser(body: ILoginUser) {
        try {
            return await this.userDao.loginUser(body);
        } catch (err: any) {
            throw new ApiException(500, err);
        }
    }

}