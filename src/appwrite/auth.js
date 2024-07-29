import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";


export class AuthServices{
    client = new Client()
    account

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client);
    }

    async createAccont({email,password,name}){
        try {
            const userAcc = await this.account.create(ID.unique(),email,password,name)
            if (userAcc) {
                //call another method
                return this.logIn({email,password})
            } else {
                return userAcc;
            }
        } catch (error) {
            throw error;
        }
    }

    async logIn({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUsr(){
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }
        return null;
    }

    async logOut(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }
}

const authServices = new AuthServices();
export default authServices;

