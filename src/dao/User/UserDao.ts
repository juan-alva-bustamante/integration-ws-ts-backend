import {AwsDocumentDB} from "../../persitence/utils/AwsDocumentDB";
import {UsersModel} from "./UserModel";
import {ILoginUser, IUpdateUserRole, IUserRequest} from "../../interfaces/Request/IUserRequest";

export class UserDao {

    private usersModel = UsersModel;

    public async createUser(body: IUserRequest) {
        try {
            let filter: any = {
                githubUser: body.githubUser
            }
            const user = await this.usersModel.findOne(filter);
            if (!user) {
                const developerUser = new UsersModel({
                    firstName: body.firstName,
                    lastName: body.lastName,
                    secondLastName: body.secondLastName,
                    githubUser: body.githubUser,
                    password: body.password,
                    creationDate: new Date().getTime(),
                    role: "DEVELOPER",
                    isPasswordUpdated: false
                });
                return await developerUser.save();
            } else {
                return Promise.reject("Nombre de usuario duplicado, intente con otro.");
            }
        } catch (e: any) {
            console.log("❌ Error al crear usuario ", e);
            return Promise.reject(e.toString());
        }
    }

    public async updateUserRol(userId: string, body: IUpdateUserRole) {
        try {
            let filter: any = {
                _id: userId
            }
            await this.usersModel.updateOne(filter, {role: body.rol});
            const user = await this.usersModel.find(filter);
            return user[0];
        } catch (e: any) {
            return Promise.reject(e.toString());
        }
    }

    public async deleteUserById(userId: string) {
        try {
            let filter: any = {
                _id: userId
            }
            await this.usersModel.deleteOne(filter);
        } catch (e: any) {
            return Promise.reject(e.toString());
        }
    }

    public async loginUser(body: ILoginUser) {
        try {
            let filter: any = {
                githubUser: body.githubUser,
                password: body.password
            }
            return await this.usersModel.findOne(filter);
        } catch (e: any) {
            return Promise.reject(e.toString());
        }
    }
}